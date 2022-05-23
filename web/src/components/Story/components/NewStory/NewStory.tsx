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
    position
    createdAt
    updatedAt
  }
  mutation CreateStoryMutation(
    $projectId: String!
    $index: Int
    $input: StoryInput!
  ) {
    createStory(projectId: $projectId, index: $index, input: $input) {
      ...NewStoryFragment
    }
  }
`

const NewStory: React.VFC<{
  projectId: string
  position?: StoryPosition
  index?: number
  onCancel?(): void
  onComplete?(): void
}> = ({ projectId, position, index, onCancel, onComplete }) => {
  const [createStory, { loading, error }] = useMutation<
    CreateStoryMutation,
    CreateStoryMutationVariables
  >(CREATE_STORY_MUTATION, {
    update(cache, result) {
      const story = result.data.createStory
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
          position,
        },
        projectId,
        index,
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
