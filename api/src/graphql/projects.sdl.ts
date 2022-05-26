export const schema = gql`
  type Project {
    id: String!
    name: String!
    privacy: ProjectPrivacy!
    description: String!
    accountId: String!
    account: Account!
    members: [Member]!
    currentVelocity: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    stories: [Story]!
  }

  enum ProjectPrivacy {
    PRIVATE
    PUBLIC
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: String!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String!
    privacy: ProjectPrivacy!
    description: String!
    accountId: String!
    currentVelocity: Int!
  }

  input UpdateProjectInput {
    name: String
    privacy: ProjectPrivacy
    description: String
    accountId: String
    currentVelocity: Int
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: String!, input: UpdateProjectInput!): Project!
      @requireAuth
    deleteProject(id: String!): Project! @requireAuth
  }
`
