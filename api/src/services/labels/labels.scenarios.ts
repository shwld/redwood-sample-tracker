import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LabelCreateArgs>({
  label: {
    one: {
      data: {
        name: 'String',
        color: 'String',
        updatedAt: '2022-05-20T20:47:37Z',
      },
    },
    two: {
      data: {
        name: 'String',
        color: 'String',
        updatedAt: '2022-05-20T20:47:37Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
