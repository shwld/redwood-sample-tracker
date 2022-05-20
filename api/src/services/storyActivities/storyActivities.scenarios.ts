import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.StoryActivityCreateArgs>({
  storyActivity: {
    one: {
      data: {
        content: 'String',
        updatedAt: '2022-05-20T20:47:58Z',
        story: {
          create: { title: 'String', updatedAt: '2022-05-20T20:47:58Z' },
        },
        user: {
          create: {
            email: 'String6850677',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-20T20:47:58Z',
          },
        },
      },
    },
    two: {
      data: {
        content: 'String',
        updatedAt: '2022-05-20T20:47:58Z',
        story: {
          create: { title: 'String', updatedAt: '2022-05-20T20:47:58Z' },
        },
        user: {
          create: {
            email: 'String13897',
            name: 'String',
            hashedPassword: 'String',
            salt: 'String',
            updatedAt: '2022-05-20T20:47:58Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
