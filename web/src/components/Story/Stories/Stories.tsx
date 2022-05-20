import { HStack } from '@chakra-ui/react'
import Card, { Head } from 'src/components/Story/components/Card/Card'
import { StoryFragment } from 'types/graphql'
import StoryAddButton from '../components/StoryAddButton/StoryAddButton'
import { useState } from 'react'
import NewStory from '../components/NewStory/NewStory'

const DELETE_STORY_MUTATION = gql`
  mutation DeleteStoryMutation($id: String!) {
    deleteStory(id: $id) {
      id
    }
  }
`

const useNewStoryForm = () => {
  const [formOpened, setOpenedForm] = useState(false)
  const openForm = () => {
    setOpenedForm(true)
  }

  return {
    formOpened,
    openForm,
  }
}

const DoneCard: React.VFC = () => {
  return (
    <Card>
      <Head title="Done" />
    </Card>
  )
}

const CurrentCard: React.VFC = () => {
  const { formOpened, openForm } = useNewStoryForm()
  return (
    <Card>
      <Head title="Current Iteration">
        <StoryAddButton onClick={openForm} />
      </Head>
      {formOpened && <NewStory />}
    </Card>
  )
}

const BacklogCard: React.VFC = () => {
  const { formOpened, openForm } = useNewStoryForm()
  return (
    <Card>
      <Head title="Backlog">
        <StoryAddButton onClick={openForm} />
      </Head>
      {formOpened && <NewStory />}
    </Card>
  )
}

const IceboxCard: React.VFC = () => {
  const { formOpened, openForm } = useNewStoryForm()
  return (
    <Card>
      <Head title="Icebox">
        <StoryAddButton onClick={openForm} />
      </Head>
      {formOpened && <NewStory />}
    </Card>
  )
}

const Stories: React.VFC<{
  currentVelocity: number
  stories: StoryFragment[]
}> = ({ currentVelocity, stories }) => {
  return (
    <HStack align="stretch" h="calc(100vh - 5rem)">
      <DoneCard />
      <CurrentCard />
      <BacklogCard />
      <IceboxCard />
    </HStack>
  )
}

export default Stories
