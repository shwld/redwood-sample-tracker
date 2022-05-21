import { HStack, Icon, Text } from '@chakra-ui/react'
import Card, { Head } from 'src/components/Story/components/Card/Card'
import { StoryFragment } from 'types/graphql'
import StoryAddButton from '../components/StoryAddButton/StoryAddButton'
import { ReactNode, useState, VFC } from 'react'
import NewStory from '../components/NewStory/NewStory'
import StoryItem from '../components/StoryItem/StoryItem'
import StoryCell from '../StoryCell'
import { BsSpeedometer } from 'react-icons/bs'

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

const CurrentCard: React.VFC<{
  currentVelocity: number
  projectId: string
  children?: ReactNode
}> = ({ currentVelocity, projectId, children }) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm()
  return (
    <Card>
      <Head title="Current Iteration">
        <Icon as={BsSpeedometer} color="white" />
        <Text color="white"> {currentVelocity}</Text>
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

const Story: VFC<{ story: StoryFragment }> = ({ story }) => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      {!opened && (
        <StoryItem
          key={story.id}
          story={story}
          onClick={() => setOpened(true)}
        />
      )}
      {opened && <StoryCell id={story.id} onClose={() => setOpened(false)} />}
    </>
  )
}

const Stories: React.VFC<{
  projectId: string
  currentVelocity: number
  stories: StoryFragment[]
}> = ({ projectId, currentVelocity, stories }) => {
  const backlogStories = stories.filter(
    (it) => it.isIcebox === false && !it.isDeleted
  )
  const iceboxStories = stories.filter(
    (it) => it.isIcebox === true && !it.isDeleted
  )
  return (
    <HStack align="stretch" h="calc(100vh - 5rem)">
      <DoneCard projectId={projectId} />
      <CurrentCard projectId={projectId} currentVelocity={currentVelocity}>
        {backlogStories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </CurrentCard>
      <BacklogCard projectId={projectId}>
        {backlogStories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </BacklogCard>
      <IceboxCard projectId={projectId}>
        {iceboxStories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </IceboxCard>
    </HStack>
  )
}

export default Stories
