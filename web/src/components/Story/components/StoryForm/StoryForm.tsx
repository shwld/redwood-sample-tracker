import { VscChevronUp } from 'react-icons/vsc'
import { Box, Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  Submit,
  SelectField,
  TextAreaField,
} from '@redwoodjs/forms'
import { VFC } from 'react'
import { EditStoryFragment, StoryInput } from 'types/graphql'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const StoryForm: VFC<{
  story?: EditStoryFragment
  loading: boolean
  error: any
  onSave(input: StoryInput, id?: string): void
  onCancel?(): void
  onClose?(): void
}> = (props) => {
  const onSubmit = (data) => {
    if (data.state === '') {
      data.state = null
    }

    props.onSave(data, props?.story?.id)
  }

  return (
    <Box p={3} bg="orange.100">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <VStack align="flex-start">
          <HStack w="full">
            {props.onClose != null && (
              <IconButton
                aria-label="Close"
                icon={<VscChevronUp />}
                size="sm"
                onClick={props.onClose}
              />
            )}
            <TextField
              name="title"
              defaultValue={props.story?.title}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
          </HStack>

          <FieldError name="title" className="rw-field-error" />
        </VStack>

        <HStack justify="flex-end" my={2} gap={2}>
          {props.onCancel && <Button onClick={props.onCancel}>Cancel</Button>}
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </HStack>

        <VStack align="stretch" rounded="md" bg="white" mt={3} py={1} gap={2}>
          <HStack justify="space-between" align="center" px={3}>
            <Label
              name="state"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              STATE
            </Label>
            <SelectField
              id="story-state-0"
              name="state"
              defaultValue=""
              defaultChecked={props.story?.state?.includes('UNSTARTED')}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            >
              <option value="">Select a state</option>
              <option value="UNSTARTED">UNSTARTED</option>
              <option value="STARTED">STARTED</option>
              <option value="FINISHED">FINISHED</option>
              <option value="ACCEPTED">ACCEPTED</option>
              <option value="REJECTED">REJECTED</option>
            </SelectField>
          </HStack>
          <FieldError name="state" className="rw-field-error" />
        </VStack>

        <VStack align="stretch" rounded="md" bg="white" mt={3} py={1} gap={2}>
          <HStack justify="space-between" align="center" px={3}>
            <Label
              name="kind"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              TYPE
            </Label>
            <SelectField
              id="story-type-0"
              name="kind"
              defaultValue="FEATURE"
              defaultChecked={props.story?.kind?.includes('FEATURE')}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            >
              <option value="FEATURE">Feature</option>
              <option value="BUG">Bug</option>
              <option value="CHORE">Chore</option>
              <option value="RELEASE">Release</option>
            </SelectField>
          </HStack>
          <FieldError name="kind" className="rw-field-error" />

          <HStack justify="space-between" align="center" px={3}>
            <Label
              name="releaseDate"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              RELEASE DATE
            </Label>

            <DatetimeLocalField
              name="releaseDate"
              defaultValue={formatDatetime(props.story?.releaseDate)}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />
          </HStack>

          <FieldError name="releaseDate" className="rw-field-error" />

          <HStack justify="space-between" align="center" px={3}>
            <Label
              name="points"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              POINTS
            </Label>

            <NumberField
              name="points"
              defaultValue={props.story?.points}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />

            <FieldError name="points" className="rw-field-error" />
          </HStack>

          <HStack justify="space-between" align="center" px={3}>
            <Label
              name="requesterId"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              REQUESTER
            </Label>

            <TextField
              name="requesterId"
              defaultValue={props.story?.requesterId}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            />

            <FieldError name="requesterId" className="rw-field-error" />
          </HStack>
        </VStack>

        <VStack mt={3} align="flex-start">
          <Box ml={1}>
            <Label
              name="description"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              DESCRIPTION
            </Label>
          </Box>

          <TextAreaField
            name="description"
            defaultValue={props.story?.description}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <FieldError name="description" className="rw-field-error" />
        </VStack>
        <FieldError name="projectId" className="rw-field-error" />
        <FieldError name="isIcebox" className="rw-field-error" />
      </Form>
    </Box>
  )
}

export default StoryForm
