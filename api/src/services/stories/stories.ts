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
  orderPriority,
  input,
}) => {
  const project = await db.user
    .findUnique({ where: { id: context.currentUser.id } })
    .projects({ where: { id: projectId } })
  if (project == null) return
  const storiesCount = db.story.aggregate({
    where: {
      projectId,
    },
    _count: true,
  })

  return db.story.create({
    data: {
      ...input,
      project: {
        connect: {
          id: projectId,
        },
      },
      storyOrderPriority: {
        create: {
          priority:
            orderPriority == null ? (await storiesCount)._count : orderPriority,
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
  labels: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).labels(),
  activities: (_obj, { root }) =>
    db.story.findUnique({ where: { id: root.id } }).activities(),
}
