export const schema = gql`
  type Story {
    id: String!
    title: String!
    description: String
    state: StoryState
    kind: StoryKind
    points: Int
    requesterId: String
    projectId: String
    releaseDate: DateTime
    project: Project
    owners: [Member]!
    orderPriority: StoryOrderPriority
    labels: [Label]!
    activities: [StoryActivity]!
    createdAt: DateTime!
    updatedAt: DateTime!

    isDeleted: Boolean
    isUnEstimated: Boolean!
  }

  type StoryOrderPriority {
    storyId: String!
    story: Story!
    position: StoryPosition
    priority: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum StoryPosition {
    DONE
    CURRENT
    BACKLOG
    ICEBOX
  }

  enum StoryState {
    UNSTARTED
    STARTED
    FINISHED
    DELIVERED
    REJECTED
    ACCEPTED
  }

  enum StoryKind {
    FEATURE
    BUG
    CHORE
    RELEASE
  }

  type Query {
    stories(projectId: String!): [Story!]! @requireAuth
    story(id: String!): Story @requireAuth
  }

  input StoryInput {
    title: String!
    kind: StoryKind!
    description: String
    state: StoryState
    points: Int
    requesterId: String
    releaseDate: DateTime
  }

  input StoryDestination {
    position: StoryPosition!
    priority: Int!
  }

  type Mutation {
    createStory(
      projectId: String!
      destination: StoryDestination
      input: StoryInput!
    ): Story! @requireAuth
    updateStory(id: String!, input: StoryInput!): Story! @requireAuth
    moveStory(ids: [String!]!, destination: StoryDestination!): [Story!]!
      @requireAuth
    deleteStory(id: String!): Story! @requireAuth
  }
`
