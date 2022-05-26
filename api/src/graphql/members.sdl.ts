// 全ユーザーが参照して良い情報だけを持たせたUserのalias ObjectType

export const schema = gql`
  type Member {
    id: String!
    email: String!
    name: String!
    avatarImageUrl: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`
