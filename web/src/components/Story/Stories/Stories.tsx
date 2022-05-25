import { HStack, Icon, Text } from '@chakra-ui/react'
import Card, { Head } from 'src/components/Story/components/Card/Card'
import { StoryFragment, StoryPosition } from 'types/graphql'
import StoryAddButton from '../components/StoryAddButton/StoryAddButton'
import { ReactNode } from 'react'
import NewStory from '../components/NewStory/NewStory'
import StoryItem from '../components/StoryItem/StoryItem'
import { BsSpeedometer } from 'react-icons/bs'
import { useMovableStoryList, useNewStoryForm } from './hooks'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const nextPriority = (stories: StoryFragment[]): number => {
  if (stories.length === 0) return 0
  return stories[0].orderPriority.priority + 1
}

const StoryCard: React.VFC<{
  title: string
  projectId: string
  stories: StoryFragment[]
  position?: StoryPosition
  headerChildren?: ReactNode
}> = ({ title, position, projectId, stories, headerChildren }) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm()
  return (
    <Droppable droppableId={position}>
      {(provided, _snapshot) => {
        return (
          <Card ref={provided.innerRef} {...provided.droppableProps}>
            <Head title={title}>
              {headerChildren}
              {position !== 'DONE' && <StoryAddButton onClick={openForm} />}
            </Head>
            {position !== 'DONE' && formOpened && (
              <NewStory
                destination={{
                  position,
                  priority: nextPriority(stories),
                }}
                projectId={projectId}
                onCancel={closeForm}
                onComplete={closeForm}
              />
            )}
            {stories.map((story, index) => {
              return (
                <Draggable key={story.id} draggableId={story.id} index={index}>
                  {(provided, _snapshot) => (
                    <StoryItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      story={story}
                    />
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </Card>
        )
      }}
    </Droppable>
  )
}

const Stories: React.VFC<{
  projectId: string
  currentVelocity: number
  stories: StoryFragment[]
}> = ({ projectId, currentVelocity, stories }) => {
  const { currentStories, backlogStories, iceboxStories, handleDragEnd } =
    useMovableStoryList(stories)
  return (
    <HStack align="stretch" h="calc(100vh - 5rem)">
      <DragDropContext onDragEnd={handleDragEnd}>
        <StoryCard
          title="Done"
          position="DONE"
          projectId={projectId}
          stories={[]}
        />
        <StoryCard
          title="Current Iteration"
          position="CURRENT"
          projectId={projectId}
          stories={currentStories}
          headerChildren={
            <>
              <Icon as={BsSpeedometer} color="white" />
              <Text color="white"> {currentVelocity}</Text>
            </>
          }
        />
        <StoryCard
          title="Backlog"
          position="BACKLOG"
          projectId={projectId}
          stories={backlogStories}
        />
        <StoryCard
          title="Icebox"
          position="ICEBOX"
          projectId={projectId}
          stories={iceboxStories}
        />
      </DragDropContext>
    </HStack>
  )
}

export default Stories
