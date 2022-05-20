export const schema = gql`
  type StoryActivity {
    id: String!
    storyId: String!
    story: Story!
    userId: String!
    user: User!
    content: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    storyActivities: [StoryActivity!]! @requireAuth
    storyActivity(id: String!): StoryActivity @requireAuth
  }

  input CreateStoryActivityInput {
    storyId: String!
    userId: String!
    content: String!
  }

  input UpdateStoryActivityInput {
    storyId: String
    userId: String
    content: String
  }

  type Mutation {
    createStoryActivity(input: CreateStoryActivityInput!): StoryActivity!
      @requireAuth
    updateStoryActivity(
      id: String!
      input: UpdateStoryActivityInput!
    ): StoryActivity! @requireAuth
    deleteStoryActivity(id: String!): StoryActivity! @requireAuth
  }
`
