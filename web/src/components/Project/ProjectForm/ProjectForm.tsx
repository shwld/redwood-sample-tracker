import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  NumberField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { VFC } from 'react'
import type { Project } from 'types/graphql'

const ProjectForm: VFC<{
  project?: Pick<
    Project,
    'id' | 'name' | 'privacy' | 'description' | 'accountId' | 'currentVelocity'
  >
  accounts: Array<{ id: string; name: string }>
  error?: any
  loading?: boolean
  onSave(data: any, id?: string): void
}> = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.project?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.project?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="privacy"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Privacy
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="project-privacy-0"
            name="privacy"
            defaultValue="PRIVATE"
            defaultChecked={props.project?.privacy?.includes('PRIVATE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Private</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="project-privacy-1"
            name="privacy"
            defaultValue="PUBLIC"
            defaultChecked={props.project?.privacy?.includes('PUBLIC')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Public</div>
        </div>

        <FieldError name="privacy" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.project?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="accountId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Account id
        </Label>

        <SelectField
          name="accountId"
          defaultValue={props.project?.accountId}
          placeholder="Account"
        >
          {props.accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </SelectField>

        <FieldError name="accountId" className="rw-field-error" />

        <Label
          name="currentVelocity"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Current verocity
        </Label>

        <NumberField
          name="currentVelocity"
          defaultValue={props.project?.currentVelocity}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="currentVelocity" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProjectForm
