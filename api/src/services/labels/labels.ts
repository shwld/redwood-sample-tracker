import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  LabelResolvers,
} from 'types/graphql'

export const labels: QueryResolvers['labels'] = () => {
  return db.label.findMany()
}

export const label: QueryResolvers['label'] = ({ id }) => {
  return db.label.findUnique({
    where: { id },
  })
}

export const createLabel: MutationResolvers['createLabel'] = ({ input }) => {
  return db.label.create({
    data: input,
  })
}

export const updateLabel: MutationResolvers['updateLabel'] = ({
  id,
  input,
}) => {
  return db.label.update({
    data: input,
    where: { id },
  })
}

export const deleteLabel: MutationResolvers['deleteLabel'] = ({ id }) => {
  return db.label.delete({
    where: { id },
  })
}

export const Label: LabelResolvers = {
  stories: (_obj, { root }) =>
    db.label.findUnique({ where: { id: root.id } }).stories(),
}
