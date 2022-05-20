import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  StoryActivityResolvers,
} from 'types/graphql'

export const storyActivities: QueryResolvers['storyActivities'] = () => {
  return db.storyActivity.findMany()
}

export const storyActivity: QueryResolvers['storyActivity'] = ({ id }) => {
  return db.storyActivity.findUnique({
    where: { id },
  })
}

export const createStoryActivity: MutationResolvers['createStoryActivity'] = ({
  input,
}) => {
  return db.storyActivity.create({
    data: input,
  })
}

export const updateStoryActivity: MutationResolvers['updateStoryActivity'] = ({
  id,
  input,
}) => {
  return db.storyActivity.update({
    data: input,
    where: { id },
  })
}

export const deleteStoryActivity: MutationResolvers['deleteStoryActivity'] = ({
  id,
}) => {
  return db.storyActivity.delete({
    where: { id },
  })
}

export const StoryActivity: StoryActivityResolvers = {
  story: (_obj, { root }) =>
    db.storyActivity.findUnique({ where: { id: root.id } }).story(),
  user: (_obj, { root }) =>
    db.storyActivity.findUnique({ where: { id: root.id } }).user(),
}
