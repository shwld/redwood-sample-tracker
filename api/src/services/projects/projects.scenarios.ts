import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ProjectCreateArgs>({
  project: {
    one: {
      data: {
        name: 'String',
        privacy: 'PRIVATE',
        description: 'String',
        currentVelocity: 1560438,
        updatedAt: '2022-05-18T21:17:09Z',
        account: {
          create: {
            name: 'String',
            updatedAt: '2022-05-18T21:17:09Z',
            members: {
              create: {
                email: 'String3950782',
                name: 'String',
                avatarImageUrl: 'String',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2022-05-18T19:51:17Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        privacy: 'PRIVATE',
        description: 'String',
        currentVelocity: 3988589,
        updatedAt: '2022-05-18T21:17:09Z',
        account: {
          create: {
            name: 'String',
            updatedAt: '2022-05-18T21:17:09Z',
            members: {
              create: {
                email: 'String3950782',
                name: 'String',
                avatarImageUrl: 'String',
                hashedPassword: 'String',
                salt: 'String',
                updatedAt: '2022-05-18T19:51:17Z',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
