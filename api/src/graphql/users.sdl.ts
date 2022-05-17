export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String!
    avatarImageUrl: String!
    stories: [Story]!
    storyOwners: [StoryOwner]!
    accounts: [Account]!
    accountMembers: [AccountMember]!
    projectMembers: [ProjectMember]!
    createdAt: DateTime!
    updatedAt: DateTime!
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
