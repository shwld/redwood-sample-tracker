import { HStack, Icon, Text } from '@chakra-ui/react'
import Card, { Head } from 'src/components/Story/components/Card/Card'
import { StoryFragment } from 'types/graphql'
import StoryAddButton from '../components/StoryAddButton/StoryAddButton'
import { ReactNode, useState, VFC } from 'react'
import NewStory from '../components/NewStory/NewStory'
import StoryItem from '../components/StoryItem/StoryItem'
import StoryCell from '../StoryCell'
import { BsSpeedometer } from 'react-icons/bs'
import { useNewStoryForm } from './hooks'

const DoneCard: React.VFC<{ projectId: string }> = ({ projectId }) => {
  return (
    <Card>
      <Head title="Done" />
    </Card>
  )
}

const nextPriority = (stories: StoryFragment[]): number => {
  if (stories.length === 0) return 0
  return stories[0].orderPriority.priority
}

const CurrentCard: React.VFC<{
  currentVelocity: number
  projectId: string
  stories: StoryFragment[]
}> = ({ currentVelocity, projectId, stories }) => {
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
          destination={{
            position: 'CURRENT',
            priority: nextPriority(stories),
          }}
          projectId={projectId}
          onCancel={closeForm}
          onComplete={closeForm}
        />
      )}
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </Card>
  )
}

const BacklogCard: React.VFC<{
  projectId: string
  stories: StoryFragment[]
}> = ({ projectId, stories }) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm()
  return (
    <Card>
      <Head title="Backlog">
        <StoryAddButton onClick={openForm} />
      </Head>
      {formOpened && (
        <NewStory
          destination={{
            position: 'BACKLOG',
            priority: nextPriority(stories),
          }}
          projectId={projectId}
          onCancel={closeForm}
          onComplete={closeForm}
        />
      )}
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </Card>
  )
}

const IceboxCard: React.VFC<{
  projectId: string
  stories: StoryFragment[]
}> = ({ projectId, stories }) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm()
  return (
    <Card>
      <Head title="Icebox">
        <StoryAddButton onClick={openForm} />
      </Head>
      {formOpened && (
        <NewStory
          destination={{
            position: 'ICEBOX',
            priority: nextPriority(stories),
          }}
          projectId={projectId}
          onCancel={closeForm}
          onComplete={closeForm}
        />
      )}
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
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
  const currentStories = stories.filter(
    (it) => it.orderPriority.position === 'CURRENT' && !it.isDeleted
  )
  const backlogStories = stories.filter(
    (it) => it.orderPriority.position === 'BACKLOG' && !it.isDeleted
  )

  const iceboxStories = stories.filter(
    (it) => it.orderPriority.position === 'ICEBOX' && !it.isDeleted
  )
  return (
    <HStack align="stretch" h="calc(100vh - 5rem)">
      <DoneCard projectId={projectId} />
      <CurrentCard
        projectId={projectId}
        currentVelocity={currentVelocity}
        stories={currentStories}
      />
      <BacklogCard projectId={projectId} stories={backlogStories} />
      <IceboxCard projectId={projectId} stories={iceboxStories} />
    </HStack>
  )
}

export default Stories
