export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String!
    avatarImageUrl: String!
    requestedStories: [Story]!
    stories: [OwnerOnStory]!
    accounts: [MemberOnAccount]!
    projects: [MemberOnProject]!
    storyActivities: [StoryActivity]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
  }

  input UpdateUserInput {
    email: String
    name: String
    avatarImageUrl: String
  }

  type Mutation {
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
