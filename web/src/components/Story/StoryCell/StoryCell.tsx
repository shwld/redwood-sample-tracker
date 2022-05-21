import type { FindStoryById } from 'types/graphql'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import StoryForm from 'src/components/Story/components/StoryForm/StoryForm'

export const QUERY = gql`
  fragment EditStoryFragment on Story {
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
  query FindStoryById($id: String!) {
    story: story(id: $id) {
      ...EditStoryFragment
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

const DELETE_STORY_MUTATION = gql`
  mutation DeleteStoryMutation($id: String!) {
    deleteStory(id: $id) {
      id
      isDeleted
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Story not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  story,
  onClose,
}: CellSuccessProps<FindStoryById & { onClose?(): void }>) => {
  const [updateStory, { loading, error }] = useMutation(UPDATE_STORY_MUTATION, {
    onCompleted: () => {
      toast.success('Story updated')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const [deleteStory, deleteResult] = useMutation(DELETE_STORY_MUTATION, {
    onCompleted: () => {
      toast.success('Story deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateStory({ variables: { id, input } })
    onClose && onClose()
  }
  const onDelete = () => {
    if (confirm('Delete story?')) {
      deleteStory({ variables: { id: story.id } })
      onClose && onClose()
    }
  }
  return (
    <StoryForm
      story={story}
      onSave={onSave}
      loading={loading || deleteResult.loading}
      error={error ?? deleteResult.error}
      onClose={onClose}
      onDelete={onDelete}
    />
  )
}
