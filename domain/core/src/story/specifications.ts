import type { Story } from 'prisma/prisma-client'

export function isUnEstimated(story: Story) {
  return story.points == null
}
