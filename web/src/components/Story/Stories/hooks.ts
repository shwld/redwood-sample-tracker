import { useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'
import {
  MoveStoryMutation,
  MoveStoryMutationVariables,
  StoryFragment,
  StoryPosition,
} from 'types/graphql'

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
    $destination: StoryDestination!
  ) {
    moveStory(ids: $ids, destination: $destination) {
      ...MoveStoryFragment
    }
  }
`

export function useMovableStoryList(stories: StoryFragment[]) {
  const filterStories = (position: StoryPosition) =>
    stories
      .filter((it) => it.orderPriority.position === position && !it.isDeleted)
      .sort((a, b) =>
        a.orderPriority.priority < b.orderPriority.priority ? 0 : -1
      )
  const [move, moveResult] = useMutation<
    MoveStoryMutation,
    MoveStoryMutationVariables
  >(MOVE_STORY_MUTATION)

  const handleDragEnd = (
    result: DropResult,
    _provided: ResponderProvided
  ): void => {
    const { source, destination } = result
    const sourcePosition = source.droppableId as StoryPosition
    const destinationPosition = destination.droppableId as StoryPosition
    const sourceItem = filterStories(sourcePosition)?.[source.index]
    // 別カードの一番下に移動するときにundefindになる
    const destinationItem =
      filterStories(destinationPosition)?.[destination.index] ??
      filterStories(destinationPosition)?.[0]

    // dropped outside the list
    if (!destination) {
      return
    }

    if (sourceItem == null) return

    console.log({
      source,
      sourceItem,
      destination,
      destinationItem,
    })

    move({
      variables: {
        ids: [sourceItem.id],
        destination: {
          position: destinationPosition,
          priority: destinationItem?.orderPriority.priority ?? 0,
        },
      },
    })
  }

  return {
    currentStories: filterStories('CURRENT'),
    backlogStories: filterStories('BACKLOG'),
    iceboxStories: filterStories('ICEBOX'),
    handleDragEnd,
  }
}

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list)
//   const [removed] = result.splice(startIndex, 1)
//   result.splice(endIndex, 0, removed)

//   return result
// }

// function handleDragEnd(result: DropResult, _provided: ResponderProvided): void {
//   const { source, destination } = result

//   // dropped outside the list
//   if (!destination) {
//     return
//   }
//   const sourceIndex = +source.droppableId
//   const destinationIndex = +destination.droppableId

//   if (sourceIndex === destinationIndex) {
//     const items = reorder(state[sourceIndex], source.index, destination.index)
//     const newState = [...state]
//     newState[sourceIndex] = items
//     // setState(newState)
//   } else {
//     const result = move(
//       state[sourceIndex],
//       state[destinationIndex],
//       source,
//       destination
//     )
//     const newState = [...state]
//     newState[sourceIndex] = result[sourceIndex]
//     newState[destinationIndex] = result[destinationIndex]

//     // setState(newState.filter((group) => group.length))
//   }
// }
