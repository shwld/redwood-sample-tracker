import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import StoryForm from '../StoryForm/StoryForm'
import { StoryInput } from 'types/graphql'

const CREATE_STORY_MUTATION = gql`
  mutation CreateStoryMutation($projectId: String!, $input: StoryInput!) {
    createStory(projectId: $projectId, index: Int!, input: $input) {
      id
    }
  }
`

const NewStory: React.VFC<{
  projectId: string
  isIcebox?: boolean
  index?: number
}> = ({ projectId, isIcebox, index = 0 }) => {
  const [createStory, { loading, error }] = useMutation(CREATE_STORY_MUTATION, {
    onCompleted: () => {
      toast.success('Story created')
      navigate(routes.stories())
    },
    onError: (error) => {
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
        index,
      },
    })
  }

  return <StoryForm onSave={onSave} loading={loading} error={error} />
}

export default NewStory
