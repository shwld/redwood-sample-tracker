import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import StoryForm from '../StoryForm/StoryForm'
import {
  CreateStoryMutation,
  CreateStoryMutationVariables,
  StoriesQuery,
  StoriesQueryVariables,
  StoryInput,
  StoryPosition,
} from 'types/graphql'
import { QUERY } from '../../StoriesCell'

const CREATE_STORY_MUTATION = gql`
  fragment NewStoryFragment on Story {
    id
    title
    description
    state
    kind
    points
    requesterId
    projectId
    releaseDate
    orderPriority {
      position
      priority
    }
    createdAt
    updatedAt
  }
  mutation CreateStoryMutation(
    $projectId: String!
    $destination: StoryDestination!
    $input: StoryInput!
  ) {
    createStory(
      projectId: $projectId
      destination: $destination
      input: $input
    ) {
      ...NewStoryFragment
    }
  }
`

const NewStory: React.VFC<{
  projectId: string
  destination: {
    position: StoryPosition
    priority: number
  }
  onCancel?(): void
  onComplete?(): void
}> = ({ projectId, destination, onCancel, onComplete }) => {
  const [createStory, { loading, error }] = useMutation<
    CreateStoryMutation,
    CreateStoryMutationVariables
  >(CREATE_STORY_MUTATION, {
    update(cache, result) {
      const story = {
        isDeleted: false,
        isUnEstimated: false,
        ...result.data.createStory,
      }
      const data = cache.readQuery<StoriesQuery, StoriesQueryVariables>({
        query: QUERY,
        variables: {
          projectId,
        },
      })
      cache.writeQuery<StoriesQuery, StoriesQueryVariables>({
        query: QUERY,
        variables: {
          projectId,
        },
        data: {
          project: {
            ...data.project,
            stories: [story, ...data.project.stories],
          },
        },
      })
    },
    onCompleted() {
      toast.success('Story created')
      onComplete && onComplete()
    },
    onError(error) {
      toast.error(error.message)
    },
  })

  const onSave = (input: StoryInput) => {
    createStory({
      variables: {
        input: {
          ...input,
        },
        projectId,
        destination,
      },
    })
  }

  return (
    <StoryForm
      onSave={onSave}
      loading={loading}
      error={error}
      onCancel={onCancel}
    />
  )
}

export default NewStory
