export const schema = gql`
  type Story {
    id: String!
    title: String!
    description: String
    state: StoryState
    points: Int
    requesterId: String
    projectId: String
    releaseDate: DateTime
    isIcebox: Boolean
    project: Project
    owners: [User]!
    storyOrders: [StoryOrder]!
    labels: [Label]!
    activities: [StoryActivity]!
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

  type Query {
    stories: [Story!]! @requireAuth
    story(id: String!): Story @requireAuth
  }

  input CreateStoryInput {
    title: String!
    description: String
    state: StoryState
    points: Int
    requesterId: String
    projectId: String
    releaseDate: DateTime
    isIcebox: Boolean
  }

  input UpdateStoryInput {
    title: String
    description: String
    state: StoryState
    points: Int
    requesterId: String
    projectId: String
    releaseDate: DateTime
    isIcebox: Boolean
  }

  type Mutation {
    createStory(input: CreateStoryInput!): Story! @requireAuth
    updateStory(id: String!, input: UpdateStoryInput!): Story! @requireAuth
    deleteStory(id: String!): Story! @requireAuth
  }
`
