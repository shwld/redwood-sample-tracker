import AccountCell from 'src/components/Account/AccountCell'

type AccountPageProps = {
  id: string
}

const AccountPage = ({ id }: AccountPageProps) => {
  return <AccountCell id={id} />
}

export default AccountPage
