import { SelectField, SelectFieldProps } from '@redwoodjs/forms'
import { SelectMemberFragment } from 'types/graphql'

export type ProjectMemberSelectProps = SelectFieldProps & {
  members: SelectMemberFragment[]
}

const ProjectMemberSelect: React.VFC<ProjectMemberSelectProps> = ({
  members,
  ...props
}) => {
  return (
    <SelectField
      {...props}
      className="rw-input"
      errorClassName="rw-input rw-input-error"
    >
      {members.map((member) => (
        <option key={member.id} value={member.id}>
          {member.name}
        </option>
      ))}
    </SelectField>
  )
}

export default ProjectMemberSelect
