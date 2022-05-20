export const schema = gql`
  type StoryOrder {
    storyId: String!
    story: Story!
    order: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    storyOrders: [StoryOrder!]! @requireAuth
    storyOrder(id: String!): StoryOrder @requireAuth
  }

  input CreateStoryOrderInput {
    storyId: String!
    order: Int!
  }

  input UpdateStoryOrderInput {
    storyId: String
    order: Int
  }

  type Mutation {
    createStoryOrder(input: CreateStoryOrderInput!): StoryOrder! @requireAuth
    updateStoryOrder(id: String!, input: UpdateStoryOrderInput!): StoryOrder!
      @requireAuth
    deleteStoryOrder(id: String!): StoryOrder! @requireAuth
  }
`
