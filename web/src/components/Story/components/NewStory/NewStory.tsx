import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import StoryForm from '../StoryForm/StoryForm'

const CREATE_STORY_MUTATION = gql`
  mutation CreateStoryMutation($input: CreateStoryInput!) {
    createStory(input: $input) {
      id
    }
  }
`

const NewStory = () => {
  const [createStory, { loading, error }] = useMutation(CREATE_STORY_MUTATION, {
    onCompleted: () => {
      toast.success('Story created')
      navigate(routes.stories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createStory({ variables: { input } })
  }

  return <StoryForm onSave={onSave} loading={loading} error={error} />
}

export default NewStory
