import EditAccountCell from 'src/components/Account/EditAccountCell'

type AccountPageProps = {
  id: string
}

const EditAccountPage = ({ id }: AccountPageProps) => {
  return <EditAccountCell id={id} />
}

export default EditAccountPage
