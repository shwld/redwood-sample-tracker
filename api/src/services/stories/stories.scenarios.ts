import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.StoryCreateArgs>({
  story: {
    one: { data: { title: 'String', updatedAt: '2022-05-20T20:38:49Z' } },
    two: { data: { title: 'String', updatedAt: '2022-05-20T20:38:49Z' } },
  },
})

export type StandardScenario = typeof standard
