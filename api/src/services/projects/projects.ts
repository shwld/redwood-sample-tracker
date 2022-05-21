import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  ProjectResolvers,
} from 'types/graphql'

export const projects: QueryResolvers['projects'] = () => {
  const userId = context.currentUser.id
  return db.project.findMany({
    where: {
      members: {
        every: {
          id: userId,
        },
      },
    },
  })
}

export const project: QueryResolvers['project'] = ({ id }) => {
  const userId = context.currentUser.id
  return db.project.findFirst({
    where: {
      id,
      members: {
        every: {
          id: userId,
        },
      },
    },
  })
}

export const createProject: MutationResolvers['createProject'] = async ({
  input,
}) => {
  const { accountId, ...rest } = input
  const userId = context.currentUser.id
  const accountUser = await db.account
    .findUnique({
      where: {
        id: accountId,
      },
    })
    .members({ where: { id: userId } })
  if (accountUser.length === 0) return null
  return db.project.create({
    data: {
      ...rest,
      account: {
        connect: {
          id: accountId,
        },
      },
      members: {
        connect: { id: userId },
      },
    },
  })
}

export const updateProject: MutationResolvers['updateProject'] = ({
  id,
  input,
}) => {
  return db.project.update({
    data: input,
    where: { id },
  })
}

export const deleteProject: MutationResolvers['deleteProject'] = ({ id }) => {
  return db.project.delete({
    where: { id },
  })
}

export const Project: ProjectResolvers = {
  account: (_obj, { root }) =>
    db.project.findUnique({ where: { id: root.id } }).account(),
  stories: (_obj, { root }) =>
    db.project
      .findUnique({ where: { id: root.id } })
      .stories({ orderBy: { storyOrderPriority: { priority: 'desc' } } }),
  members: (_obj, { root }) =>
    db.project.findUnique({ where: { id: root.id } }).members(),
}
