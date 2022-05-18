import type { EditAccountById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import AccountForm from 'src/components/Account/AccountForm'

export const QUERY = gql`
  query EditAccountById($id: String!) {
    account: account(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdateAccountMutation($id: String!, $input: UpdateAccountInput!) {
    updateAccount(id: $id, input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ account }: CellSuccessProps<EditAccountById>) => {
  const [updateAccount, { loading, error }] = useMutation(UPDATE_ACCOUNT_MUTATION, {
    onCompleted: () => {
      toast.success('Account updated')
      navigate(routes.accounts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateAccount({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Account {account.id}</h2>
      </header>
      <div className="rw-segment-main">
        <AccountForm account={account} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
