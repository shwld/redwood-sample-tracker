import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  StoryOrderResolvers,
} from 'types/graphql'

export const storyOrders: QueryResolvers['storyOrders'] = () => {
  return db.storyOrder.findMany()
}

export const storyOrder: QueryResolvers['storyOrder'] = ({ id }) => {
  return db.storyOrder.findUnique({
    where: { id },
  })
}

export const createStoryOrder: MutationResolvers['createStoryOrder'] = ({
  input,
}) => {
  return db.storyOrder.create({
    data: input,
  })
}

export const updateStoryOrder: MutationResolvers['updateStoryOrder'] = ({
  id,
  input,
}) => {
  return db.storyOrder.update({
    data: input,
    where: { id },
  })
}

export const deleteStoryOrder: MutationResolvers['deleteStoryOrder'] = ({
  id,
}) => {
  return db.storyOrder.delete({
    where: { id },
  })
}

export const StoryOrder: StoryOrderResolvers = {
  story: (_obj, { root }) =>
    db.storyOrder.findUnique({ where: { id: root.id } }).story(),
}
