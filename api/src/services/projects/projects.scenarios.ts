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
          create: { name: 'String', updatedAt: '2022-05-18T21:17:09Z' },
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
          create: { name: 'String', updatedAt: '2022-05-18T21:17:09Z' },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
