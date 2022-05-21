import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  StoryResolvers,
} from 'types/graphql'

export const stories: QueryResolvers['stories'] = () => {
  return db.story.findMany()
}

export const story: QueryResolvers['story'] = ({ id }) => {
  return db.story.findUnique({
    where: { id },
  })
}

export const createStory: MutationResolvers['createStory'] = async ({
  projectId,
  index,
  input,
}) => {
  const project = await db.user
    .findUnique({ where: { id: context.currentUser.id } })
    .projects({ where: { id: projectId } })
  if (project == null) return

  return db.story.create({
    data: {
      ...input,
      project: {
        connect: {
          id: projectId,
        },
      },
      storyOrders: {
        create: {
          order: index,
        },
      },
    },
  })
}

export const updateStory: MutationResolvers['updateStory'] = ({
  id,
  input,
}) => {
  return db.story.update({
    data: input,
    where: { id },
  })
}

export const deleteStory: MutationResolvers['deleteStory'] = ({ id }) => {
  return db.story.delete({
    where: { id },
  })
}

export const Story: StoryResolvers = {
  project: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).project(),
  owners: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).owners(),
  storyOrders: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).storyOrders(),
  labels: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).labels(),
  activities: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).activities(),
}
