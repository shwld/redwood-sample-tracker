import { Story as storyDomain } from 'core-domain'
import type {
  QueryResolvers,
  MutationResolvers,
  StoryResolvers,
} from 'types/graphql'

import * as storyRepository from 'src/repositories/stories/stories'

export const stories: QueryResolvers['stories'] = ({ projectId }) => {
  return storyRepository.storiesOfUserProject(
    { userId: context.currentUser.id, projectId },
    {
      where: {
        projectId,
      },
    }
  )
}

export const story: QueryResolvers['story'] = ({ id }) => {
  return storyRepository.storyOfUser({ userId: context.currentUser.id, id })
}

export const createStory: MutationResolvers['createStory'] = async ({
  projectId,
  destination,
  input,
}) => {
  const { releaseDate, ...storyInput } = input
  return storyRepository.createStory({
    userId: context.currentUser.id,
    projectId,
    destination,
    input: {
      ...storyInput,
      releaseDate: new Date(releaseDate),
    },
  })
}

export const updateStory: MutationResolvers['updateStory'] = ({
  id,
  input,
}) => {
  const { releaseDate, ...storyInput } = input
  return storyRepository.updateStory({
    userId: context.currentUser.id,
    id,
    input: {
      ...storyInput,
      releaseDate: new Date(releaseDate),
    },
  })
}

export const moveStory: MutationResolvers['moveStory'] = ({
  ids,
  destination,
}) => {
  return storyRepository.reorderStories({
    storyIds: ids,
    userId: context.currentUser.id,
    destination: {
      position: destination.position,
      priority: destination.priority,
    },
  })
}

export const deleteStory: MutationResolvers['deleteStory'] = async ({ id }) => {
  const story = await storyRepository.deleteStory({
    userId: context.currentUser.id,
    id,
  })
  if (story == null) return

  return {
    ...story,
    isDeleted: true,
  }
}

export const Story: StoryResolvers = {
  isUnEstimated: (_obj, { root }) => storyDomain.isUnEstimated(root),
  orderPriority: (_obj, { root }) =>
    storyRepository.getRelationOrderPriority(root),
  project: (_obj, { root }) => storyRepository.getRelationProject(root),
  // owners: (_obj, { root }) => storyRepository.getRelationOwners(root),
  labels: (_obj, { root }) => storyRepository.getRelationLabels(root),
  activities: (_obj, { root }) => storyRepository.getRelationActivities(root),
}
