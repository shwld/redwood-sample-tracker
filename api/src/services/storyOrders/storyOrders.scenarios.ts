import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.StoryOrderCreateArgs>({
  storyOrder: {
    one: {
      data: {
        order: 6858655,
        updatedAt: '2022-05-20T20:47:19Z',
        story: {
          create: { title: 'String', updatedAt: '2022-05-20T20:47:19Z' },
        },
      },
    },
    two: {
      data: {
        order: 607422,
        updatedAt: '2022-05-20T20:47:19Z',
        story: {
          create: { title: 'String', updatedAt: '2022-05-20T20:47:19Z' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
