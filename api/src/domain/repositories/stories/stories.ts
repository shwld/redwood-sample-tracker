import { db } from 'src/lib/db'
import { PrismaPromise, Prisma, Story } from '@prisma/client'

export function storiesOfUserProject(
  args: {
    userId: string
    projectId: string
  },
  options?: Omit<Prisma.Subset<{}, Prisma.StoryFindManyArgs>, 'where'>
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
  })
}

export async function getStoryPriority(args: {
  projectId: string
  index?: number
}): Promise<number> {
  if (args.index != null) {
    const indexedStory = await db.story.findFirst({
      where: {
        projectId: args.projectId,
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
    const priority = indexedStory.storyOrderPriority.priority
    return priority
  }

  const storiesCount = await db.story.aggregate({
    where: {
      projectId: args.projectId,
    },
    _count: true,
  })

  return storiesCount._count
}

type Input = {
  description?: Story['description']
  kind: Story['kind']
  points?: Story['points']
  position?: Story['position']
  releaseDate?: Story['releaseDate']
  requesterId?: Story['requesterId']
  state?: Story['state']
  title: Story['title']
}

export async function createStory(args: {
  userId: string
  projectId: string
  index?: number
  input: Input
}): Promise<Story | undefined> {
  const project = await db.user
    .findUnique({ where: { id: args.userId } })
    .projects({ where: { id: args.projectId } })
  if (project == null) return

  const priority = await getStoryPriority({
    projectId: args.projectId,
    index: args.index,
  })

  if (args.index != null) {
    db.storyOrderPriority.updateMany({
      where: {
        projectId: args.projectId,
        priority: {
          gte: priority,
        },
      },
      data: {
        priority: {
          increment: 1,
        },
      },
    })
  }

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
