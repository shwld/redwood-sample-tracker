import { VscChevronUp, VscTrash } from 'react-icons/vsc'
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  VStack,
} from '@chakra-ui/react'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit,
  SelectField,
  TextAreaField,
} from '@redwoodjs/forms'
import { VFC } from 'react'
import { EditStoryFragment, StoryInput } from 'types/graphql'
import ProjectMemberSelectCell from 'src/components/@shared/ProjectMemberSelectCell'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const StoryForm: VFC<{
  projectId: string
  story?: EditStoryFragment
  loading: boolean
  error: any
  onSave(input: StoryInput, id?: string): void
  onCancel?(): void
  onClose?(): void
  onDelete?(): void
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

        <HStack justify="space-between" w="full" my={2} gap={2}>
          <ButtonGroup size="sm" isAttached variant="outline">
            {props.onDelete && (
              <IconButton
                aria-label="Delete"
                colorScheme="red"
                icon={<Icon as={VscTrash} />}
                onClick={props.onDelete}
              />
            )}
          </ButtonGroup>

          <HStack justify="flex-end">
            {props.onCancel && <Button onClick={props.onCancel}>Cancel</Button>}
            <Submit
              disabled={props.loading}
              className="rw-button rw-button-blue"
            >
              Save
            </Submit>
          </HStack>
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
              defaultValue={props.story?.state ?? 'UNSTARTED'}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
            >
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
              defaultValue={props.story?.kind ?? 'FEATURE'}
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

            <SelectField
              name="points"
              defaultValue={props.story?.points}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ valueAsNumber: true }}
            >
              <option value={null}>Unestimated</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={13}>13</option>
              <option value={20}>20</option>
              <option value={40}>40</option>
            </SelectField>

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

            <ProjectMemberSelectCell
              projectId={props.projectId}
              componentProps={{
                name: 'requesterId',
                defaultValue: props.story?.requesterId,
              }}
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
        <FieldError name="position" className="rw-field-error" />
      </Form>
    </Box>
  )
}

export default StoryForm
