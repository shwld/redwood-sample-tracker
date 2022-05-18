import type { FindAccountById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Account from 'src/components/Account/Account'

export const QUERY = gql`
  query FindAccountById($id: String!) {
    account: account(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Account not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ account }: CellSuccessProps<FindAccountById>) => {
  return <Account account={account} />
}
