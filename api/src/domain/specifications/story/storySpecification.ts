import { Story } from 'prisma/prisma-client'

export default {
  isUnEstimated(story: Story) {
    return story.points == null
  },
}
