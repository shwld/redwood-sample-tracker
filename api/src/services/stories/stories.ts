import * as storyRepository from 'src/domain/repositories/stories/stories'
import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  StoryResolvers,
} from 'types/graphql'

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
  index,
  input,
}) => {
  const { releaseDate, ...storyInput } = input
  return storyRepository.createStory({
    userId: context.currentUser.id,
    projectId,
    index,
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
  project: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).project(),
  owners: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).owners(),
  labels: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).labels(),
  activities: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).activities(),
}
