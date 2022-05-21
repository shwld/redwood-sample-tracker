import { HStack } from '@chakra-ui/react'
import Card, { Head } from 'src/components/Story/components/Card/Card'
import { StoryFragment } from 'types/graphql'
import StoryAddButton from '../components/StoryAddButton/StoryAddButton'
import { ReactNode, useState } from 'react'
import NewStory from '../components/NewStory/NewStory'
import StoryItem from '../components/StoryItem/StoryItem'

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
  const closeForm = () => {
    setOpenedForm(false)
  }

  return {
    formOpened,
    openForm,
    closeForm,
  }
}

const DoneCard: React.VFC<{ projectId: string; children?: ReactNode }> = ({
  projectId,
  children,
}) => {
  return (
    <Card>
      <Head title="Done" />
      {children}
    </Card>
  )
}

const CurrentCard: React.VFC<{ projectId: string; children?: ReactNode }> = ({
  projectId,
  children,
}) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm()
  return (
    <Card>
      <Head title="Current Iteration">
        <StoryAddButton onClick={openForm} />
      </Head>
      {formOpened && (
        <NewStory
          isIcebox={false}
          projectId={projectId}
          onCancel={closeForm}
          onComplete={closeForm}
        />
      )}
      {children}
    </Card>
  )
}

const BacklogCard: React.VFC<{ projectId: string; children?: ReactNode }> = ({
  projectId,
  children,
}) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm()
  return (
    <Card>
      <Head title="Backlog">
        <StoryAddButton onClick={openForm} />
      </Head>
      {formOpened && (
        <NewStory
          isIcebox={false}
          projectId={projectId}
          onCancel={closeForm}
          onComplete={closeForm}
        />
      )}
      {children}
    </Card>
  )
}

const IceboxCard: React.VFC<{ projectId: string; children?: ReactNode }> = ({
  projectId,
  children,
}) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm()
  return (
    <Card>
      <Head title="Icebox">
        <StoryAddButton onClick={openForm} />
      </Head>
      {formOpened && (
        <NewStory
          isIcebox
          projectId={projectId}
          onCancel={closeForm}
          onComplete={closeForm}
        />
      )}
      {children}
    </Card>
  )
}

const Stories: React.VFC<{
  projectId: string
  currentVelocity: number
  stories: StoryFragment[]
}> = ({ projectId, currentVelocity, stories }) => {
  const backlogStories = stories.filter((it) => it.isIcebox === false)
  const iceboxStories = stories.filter((it) => it.isIcebox === true)
  return (
    <HStack align="stretch" h="calc(100vh - 5rem)">
      <DoneCard projectId={projectId} />
      <CurrentCard projectId={projectId}>
        {backlogStories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </CurrentCard>
      <BacklogCard projectId={projectId}>
        {backlogStories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </BacklogCard>
      <IceboxCard projectId={projectId}>
        {iceboxStories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
      </IceboxCard>
    </HStack>
  )
}

export default Stories
