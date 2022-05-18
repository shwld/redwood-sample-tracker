import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  ProjectResolvers,
} from 'types/graphql'

export const projects: QueryResolvers['projects'] = () => {
  return db.project.findMany()
}

export const project: QueryResolvers['project'] = ({ id }) => {
  return db.project.findUnique({
    where: { id },
  })
}

export const createProject: MutationResolvers['createProject'] = ({
  input,
}) => {
  return db.project.create({
    data: input,
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
    db.project.findUnique({ where: { id: root.id } }).stories(),
  members: (_obj, { root }) =>
    db.project.findUnique({ where: { id: root.id } }).members(),
}
