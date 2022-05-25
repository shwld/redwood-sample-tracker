import { db } from 'src/lib/db'
import {
  PrismaPromise,
  Prisma,
  Story,
  StoryOrderPriority,
  StoryPosition,
} from '@prisma/client'

export function storiesOfUserProject(
  args: {
    userId: string
    projectId: string
  },
  options?: Omit<
    Prisma.Subset<{}, Prisma.StoryFindManyArgs>,
    'where' | 'include'
  >
): PrismaPromise<Story[]> {
  return db.story.findMany({
    where: {
      project: {
        id: args.projectId,
        account: {
          members: {
            some: {
              id: args.userId,
            },
          },
        },
      },
    },
    include: {
      storyOrderPriority: true,
    },
    ...options,
  })
}

export function storyOfUser(args: {
  userId: string
  id: string
}): PrismaPromise<Story> {
  return db.story.findFirst({
    where: {
      id: args.id,
      project: {
        account: {
          members: {
            some: {
              id: args.userId,
            },
          },
        },
      },
    },
    include: {
      storyOrderPriority: true,
    },
  })
}

type Input = {
  description?: Story['description']
  kind: Story['kind']
  points?: Story['points']
  releaseDate?: Story['releaseDate']
  requesterId?: Story['requesterId']
  state?: Story['state']
  title: Story['title']
}

export async function createStory(args: {
  userId: string
  projectId: string
  destination: {
    position: Omit<StoryOrderPriority['position'], 'DONE'>
    priority: number
  }
  input: Input
}): Promise<Story | undefined> {
  const project = await db.user
    .findUnique({ where: { id: args.userId } })
    .projects({ where: { id: args.projectId } })
  if (project == null) return

  return db.story.create({
    data: {
      ...args.input,
      project: {
        connect: {
          id: args.projectId,
        },
      },
      storyOrderPriority: {
        create: {
          project: {
            connect: {
              id: args.projectId,
            },
          },
          position: args.destination.position as StoryOrderPriority['position'],
          priority: args.destination.priority,
        },
      },
    },
  })
}

export async function updateStory(args: {
  id: string
  userId: string
  input: Input
}): Promise<Story | undefined> {
  const story = await storyOfUser({ userId: args.userId, id: args.id })
  if (story == null) return

  return db.story.update({
    data: args.input,
    where: { id: args.id },
  })
}

export async function deleteStory(args: {
  id: string
  userId: string
}): Promise<Story | undefined> {
  const story = await storyOfUser({ userId: args.userId, id: args.id })
  if (story == null) return

  await db.$transaction([
    db.storyOrderPriority.delete({
      where: { storyId: args.id },
    }),
    db.story.delete({
      where: { id: args.id },
    }),
  ])

  return story
}

type StoryAndPosition = Story & {
  storyOrderPriority: StoryOrderPriority
}

// 移動元ストーリーのpriority分詰める
async function closePriority(args: {
  projectId: string
  sourceStories: Array<StoryAndPosition>
  sourcePosition: StoryPosition
}): Promise<StoryOrderPriority[]> {
  const sources = args.sourceStories.filter(
    (it) => it.storyOrderPriority.position === args.sourcePosition
  )
  if (sources.length === 0) return []

  const maximumPriority = Math.max(
    ...args.sourceStories.map((it) => it.storyOrderPriority.priority)
  )
  const targetItems = await db.storyOrderPriority.findMany({
    where: {
      projectId: args.projectId,
      storyId: {
        notIn: sources.map((it) => it.id),
      },
      priority: {
        gt: maximumPriority,
      },
      position: args.sourcePosition,
    },
  })
  await db.storyOrderPriority.updateMany({
    where: {
      projectId: args.projectId,
      storyId: {
        in: targetItems.map((it) => it.storyId),
      },
      position: args.sourcePosition,
    },
    data: {
      priority: {
        decrement: sources.length,
      },
    },
  })
  return targetItems
}

async function shiftPriority(args: {
  projectId: string
  sourceStories: Array<StoryAndPosition>
  destination: { position: StoryPosition; priority: number }
}): Promise<StoryOrderPriority[]> {
  if (args.sourceStories.length === 0) return []

  const destinations = args.sourceStories.filter(
    (it) => it.storyOrderPriority.position === args.destination.position
  )
  const targetItems = await db.storyOrderPriority.findMany({
    where: {
      projectId: args.projectId,
      storyId: {
        notIn: destinations.map((it) => it.id),
      },
      priority: {
        gte: args.destination.priority,
      },
      position: args.destination.position,
    },
  })
  await db.storyOrderPriority.updateMany({
    where: {
      projectId: args.projectId,
      storyId: {
        in: targetItems.map((it) => it.storyId),
      },
      position: args.destination.position,
    },
    data: {
      priority: {
        increment: args.sourceStories.length,
      },
    },
  })
  return targetItems
}

export async function reorderStories(args: {
  storyIds: string[]
  userId: string
  destination: { position: StoryPosition; priority: number }
}): Promise<StoryAndPosition[]> {
  const stories = await db.story.findMany({
    where: {
      id: {
        in: args.storyIds,
      },
      project: {
        account: {
          members: {
            some: {
              id: args.userId,
            },
          },
        },
      },
    },
    include: {
      storyOrderPriority: true,
    },
  })

  if (stories.length === 0) return []
  const projectId = stories[0].projectId

  const effectedStories = [
    StoryPosition.DONE,
    StoryPosition.CURRENT,
    StoryPosition.BACKLOG,
    StoryPosition.ICEBOX,
  ].map((position) => {
    return closePriority({
      projectId,
      sourceStories: stories,
      sourcePosition: position,
    })
  })
  const effectStoriesPromises = await Promise.all(effectedStories)
  const effectedItemIds = effectStoriesPromises.flat().map((it) => it.storyId)
  const storyIds = stories.map((it) => it.id)

  await shiftPriority({
    projectId,
    sourceStories: stories,
    destination: args.destination,
  })

  const updatesPromises = storyIds.map((storyId, index) =>
    db.storyOrderPriority.update({
      where: {
        storyId,
      },
      data: {
        position: args.destination.position,
        priority: {
          set: args.destination.priority + index,
        },
      },
    })
  )
  await Promise.all(updatesPromises)

  return db.story.findMany({
    where: {
      id: {
        in: [...effectedItemIds, ...storyIds],
      },
    },
    include: {
      storyOrderPriority: true,
    },
  })
}
