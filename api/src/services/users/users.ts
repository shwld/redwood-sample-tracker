import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserResolvers = {
  requestedStories: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).requestedStories(),
  stories: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).stories(),
  accounts: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).accounts(),
  projects: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).projects(),
  storyActivities: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).storyActivities(),
}
