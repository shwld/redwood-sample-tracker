import type { FindProjectMembers } from 'types/graphql'
import { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import ProjectMemberSelect, {
  ProjectMemberSelectProps,
} from '../ProjectMemberSelect/ProjectMemberSelect'

export const QUERY = gql`
  fragment SelectMemberFragment on Member {
    id
    email
    name
    avatarImageUrl
  }
  query FindProjectMembers($projectId: String!) {
    project: project(id: $projectId) {
      id
      members {
        ...SelectMemberFragment
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Story not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  project,
  componentProps,
}: CellSuccessProps<
  FindProjectMembers & {
    componentProps: Omit<ProjectMemberSelectProps, 'members'>
  }
>) => {
  return <ProjectMemberSelect members={project.members} {...componentProps} />
}
