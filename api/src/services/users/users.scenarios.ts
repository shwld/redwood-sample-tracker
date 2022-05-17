import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String2930993',
        name: 'String',
        avatarImageUrl: 'String',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-05-17T23:47:35Z',
      },
    },
    two: {
      data: {
        email: 'String5496335',
        name: 'String',
        avatarImageUrl: 'String',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-05-17T23:47:35Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
