export const schema = gql`
  type Story {
    id: String!
    title: String!
    description: String
    state: StoryState
    type: StoryType
    points: Int
    requesterId: String
    projectId: String
    releaseDate: DateTime
    isIcebox: Boolean
    project: Project
    owners: [User]!
    storyOrderPriorities: [StoryOrderPriority]!
    labels: [Label]!
    activities: [StoryActivity]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type StoryOrderPriority {
    storyId: String!
    story: Story!
    priority: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum StoryState {
    UNSTARTED
    STARTED
    FINISHED
    DELIVERED
    REJECTED
    ACCEPTED
  }

  enum StoryType {
    FEATURE
    BUG
    CHORE
    RELEASE
  }

  type Query {
    stories: [Story!]! @requireAuth
    story(id: String!): Story @requireAuth
  }

  input StoryInput {
    title: String!
    description: String
    state: StoryState
    points: Int
    requesterId: String
    releaseDate: DateTime
    isIcebox: Boolean
  }

  type Mutation {
    createStory(projectId: String!, index: Int!, input: StoryInput!): Story!
      @requireAuth
    updateStory(id: String!, input: StoryInput!): Story! @requireAuth
    deleteStory(id: String!): Story! @requireAuth
  }
`
