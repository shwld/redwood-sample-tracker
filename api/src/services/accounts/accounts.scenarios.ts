import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.AccountCreateArgs>({
  account: {
    one: { data: { name: 'String', updatedAt: '2022-05-18T19:55:24Z' } },
    two: { data: { name: 'String', updatedAt: '2022-05-18T19:55:24Z' } },
  },
})

export type StandardScenario = typeof standard
