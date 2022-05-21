import type { EditStoryById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import StoryForm from 'src/components/Story/StoryForm'

export const QUERY = gql`
  query EditStoryById($id: String!) {
    story: story(id: $id) {
      id
      title
      description
      state
      kind
      points
      requesterId
      projectId
      releaseDate
      isIcebox
      createdAt
      updatedAt
    }
  }
`
const UPDATE_STORY_MUTATION = gql`
  mutation UpdateStoryMutation($id: String!, $input: StoryInput!) {
    updateStory(id: $id, input: $input) {
      id
      title
      description
      state
      kind
      points
      requesterId
      projectId
      releaseDate
      isIcebox
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ story }: CellSuccessProps<EditStoryById>) => {
  const [updateStory, { loading, error }] = useMutation(UPDATE_STORY_MUTATION, {
    onCompleted: () => {
      toast.success('Story updated')
      navigate(routes.stories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateStory({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Story {story.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <StoryForm
          story={story}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
