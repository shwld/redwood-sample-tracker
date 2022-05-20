import type { EditProjectById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import ProjectForm from 'src/components/Project/ProjectForm'

export const QUERY = gql`
  query EditProjectById($id: String!) {
    project: project(id: $id) {
      id
      name
      privacy
      description
      accountId
      currentVelocity
      createdAt
      updatedAt
    }
  }
`
const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProjectMutation($id: String!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      privacy
      description
      accountId
      currentVelocity
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ project }: CellSuccessProps<EditProjectById>) => {
  const [updateProject, { loading, error }] = useMutation(
    UPDATE_PROJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project updated')
        navigate(routes.projects())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateProject({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Project {project.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ProjectForm
          project={project}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
