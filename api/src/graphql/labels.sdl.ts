export const schema = gql`
  type Label {
    id: String!
    name: String!
    color: String!
    stories: [Story]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    labels: [Label!]! @requireAuth
    label(id: String!): Label @requireAuth
  }

  input CreateLabelInput {
    name: String!
    color: String!
  }

  input UpdateLabelInput {
    name: String
    color: String
  }

  type Mutation {
    createLabel(input: CreateLabelInput!): Label! @requireAuth
    updateLabel(id: String!, input: UpdateLabelInput!): Label! @requireAuth
    deleteLabel(id: String!): Label! @requireAuth
  }
`
