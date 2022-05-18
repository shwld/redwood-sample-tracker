import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'



const ProjectForm = (props) => {
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
          <div>
            Private
          </div>
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
          <div>
            Public
          </div>
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
        
          <TextField
            name="accountId"
            defaultValue={props.project?.accountId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="accountId" className="rw-field-error" />

        <Label
          name="currentVerocity"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Current verocity
        </Label>
        
          <NumberField
            name="currentVerocity"
            defaultValue={props.project?.currentVerocity}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="currentVerocity" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProjectForm
