import {
  Story,
  StoryKind,
  StoryState,
  StoryPosition,
  StoryOrderPriority,
} from 'prisma/prisma-client'

export class StoryEntity {
  constructor(story: Story & { storyOrderPriority: StoryOrderPriority }) {
    this.id = story.id
    this.title = story.title
    this.description = story.description
    this.state = story.state
    this.kind = story.kind
    this.points = story.points
    this.requesterId = story.requesterId
    this.projectId = story.projectId
    this.releaseDate = story.releaseDate
    this.createdAt = story.createdAt
    this.updatedAt = story.updatedAt
    this.position = story.storyOrderPriority.position
    this.priority = story.storyOrderPriority.priority
  }

  readonly id: string
  readonly title: string
  readonly description: string | null
  readonly state: StoryState
  readonly kind: StoryKind
  readonly points: number | null
  readonly requesterId: string | null
  readonly projectId: string | null
  readonly releaseDate: Date | null
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly position: StoryPosition
  readonly priority: number

  get isUnEstimated() {
    return this.points == null
  }
}
