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

export async function getStoryPriority(args: {
  projectId: string
  position: StoryPosition
  index?: number
}): Promise<number> {
  if (args.index != null) {
    const indexedStory = await db.story.findFirst({
      where: {
        projectId: args.projectId,
        storyOrderPriority: {
          position: args.position,
        },
      },
      skip: args.index,
      include: {
        storyOrderPriority: true,
      },
      orderBy: {
        storyOrderPriority: {
          priority: 'desc',
        },
      },
    })
    const priority = indexedStory?.storyOrderPriority.priority ?? 0
    return priority
  }

  const storiesCount = await db.story.aggregate({
    where: {
      projectId: args.projectId,
      storyOrderPriority: {
        position: args.position,
      },
    },
    _count: true,
  })

  return storiesCount._count
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
    index?: number
  }
  input: Input
}): Promise<Story | undefined> {
  const project = await db.user
    .findUnique({ where: { id: args.userId } })
    .projects({ where: { id: args.projectId } })
  if (project == null) return

  const priority = await getStoryPriority({
    projectId: args.projectId,
    position: args.destination.position as StoryPosition,
    index: args.destination.index,
  })
  console.log('priority', priority)

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
          priority,
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

async function shiftPriority(args: {
  stories: Array<StoryAndPosition>
  position: StoryPosition
}): Promise<StoryOrderPriority[]> {
  const targets = args.stories.filter(
    (it) => it.storyOrderPriority.position === args.position
  )
  if (targets.length === 0) return []

  const minimumDoneIndex = Math.min(
    ...targets.map((it) => it.storyOrderPriority.priority)
  )
  const targetItems = await db.storyOrderPriority.findMany({
    where: {
      priority: {
        gte: minimumDoneIndex,
      },
      position: args.position,
    },
  })
  db.storyOrderPriority.updateMany({
    where: {
      storyId: {
        in: targetItems.map((it) => it.storyId),
      },
      position: StoryPosition.DONE,
    },
    data: {
      priority: {
        increment: targets.length,
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

  const effectedDoneStories = [
    StoryPosition.DONE,
    StoryPosition.CURRENT,
    StoryPosition.BACKLOG,
    StoryPosition.ICEBOX,
  ].map((position) => {
    return shiftPriority({
      stories,
      position,
    })
  })

  const result = await Promise.all(effectedDoneStories)
  const effectedItemIds = result.flat().map((it) => it.storyId)
  const storyIds = stories.map((it) => it.id)

  await db.storyOrderPriority.updateMany({
    where: {
      storyId: {
        in: storyIds,
      },
    },
    data: {
      position: args.destination.position,
      priority: {
        set: args.destination.priority - 1,
        increment: 1,
      },
    },
  })

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
