import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'

export const useNewStoryForm = () => {
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

const MOVE_STORY_MUTATION = gql`
  fragment MoveStoryFragment on Story {
    id
    orderPriority {
      position
      priority
    }
    updatedAt
  }
  mutation MoveStoryMutation(
    $ids: [String!]!
    $position: StoryPosition!
    $index: Int!
  ) {
    createStory(ids: $ids, position: $position, index: $index) {
      ...MoveStoryFragment
    }
  }
`

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function handleDragEnd(result: DropResult, _provided: ResponderProvided): void {
  const { source, destination } = result

  // dropped outside the list
  if (!destination) {
    return
  }
  const sourceIndex = +source.droppableId
  const destinationIndex = +destination.droppableId

  if (sourceIndex === destinationIndex) {
    const items = reorder(state[sourceIndex], source.index, destination.index)
    const newState = [...state]
    newState[sourceIndex] = items
    // setState(newState)
  } else {
    const result = move(
      state[sourceIndex],
      state[destinationIndex],
      source,
      destination
    )
    const newState = [...state]
    newState[sourceIndex] = result[sourceIndex]
    newState[destinationIndex] = result[destinationIndex]

    // setState(newState.filter((group) => group.length))
  }
}
