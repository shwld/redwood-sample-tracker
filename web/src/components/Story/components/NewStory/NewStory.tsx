import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import StoryForm from '../StoryForm/StoryForm'
import {
  CreateStoryMutation,
  CreateStoryMutationVariables,
  StoriesQuery,
  StoriesQueryVariables,
  StoryInput,
} from 'types/graphql'
import { QUERY } from '../../StoriesCell'

const CREATE_STORY_MUTATION = gql`
  mutation CreateStoryMutation(
    $projectId: String!
    $orderPriority: Int
    $input: StoryInput!
  ) {
    createStory(
      projectId: $projectId
      orderPriority: $orderPriority
      input: $input
    ) {
      id
    }
  }
`

const NewStory: React.VFC<{
  projectId: string
  isIcebox?: boolean
  orderPriority?: number
  onCancel?(): void
  onComplete?(): void
}> = ({ projectId, isIcebox, orderPriority = 0, onCancel, onComplete }) => {
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
          isIcebox,
        },
        projectId,
        orderPriority,
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
