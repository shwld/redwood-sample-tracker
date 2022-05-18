import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  AccountResolvers,
} from 'types/graphql'

export const accounts: QueryResolvers['accounts'] = () => {
  const userId = context.currentUser.id
  return db.user.findUnique({ where: { id: userId } }).accounts()
}

export const account: QueryResolvers['account'] = ({ id }) => {
  const userId = context.currentUser.id
  return db.account.findFirst({
    where: { id, members: { every: { id: userId } } },
  })
}

export const createAccount: MutationResolvers['createAccount'] = ({
  input,
}) => {
  const userId = context.currentUser.id
  return db.account.create({
    data: {
      ...input,
      members: {
        connect: [
          {
            id: userId,
          },
        ],
      },
    },
  })
}

export const updateAccount: MutationResolvers['updateAccount'] = ({
  id,
  input,
}) => {
  return db.account.update({
    data: input,
    where: { id },
  })
}

export const deleteAccount: MutationResolvers['deleteAccount'] = ({ id }) => {
  return db.account.delete({
    where: { id },
  })
}

export const Account: AccountResolvers = {
  projects: (_obj, { root }) =>
    db.account.findUnique({ where: { id: root.id } }).projects(),
  members: (_obj, { root }) =>
    db.account.findUnique({ where: { id: root.id } }).members(),
}
