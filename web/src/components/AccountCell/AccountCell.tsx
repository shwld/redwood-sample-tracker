import type { FindAccountQuery, FindAccountQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindAccountQuery($id: String!) {
    account: account(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindAccountQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  account,
}: CellSuccessProps<FindAccountQuery, FindAccountQueryVariables>) => {
  return <div>{JSON.stringify(account)}</div>
}
