import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String3950782',
        name: 'String',
        avatarImageUrl: 'String',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-05-18T19:51:17Z',
      },
    },
    two: {
      data: {
        email: 'String1724981',
        name: 'String',
        avatarImageUrl: 'String',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-05-18T19:51:17Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
