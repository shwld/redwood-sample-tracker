export const schema = gql`
  type Account {
    id: String!
    name: String!
    members: [Member]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    accounts: [Account!]! @requireAuth
    account(id: String!): Account @requireAuth
  }

  input CreateAccountInput {
    name: String!
  }

  input UpdateAccountInput {
    name: String
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): Account! @requireAuth
    updateAccount(id: String!, input: UpdateAccountInput!): Account!
      @requireAuth
    deleteAccount(id: String!): Account! @requireAuth
  }
`
