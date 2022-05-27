import { StarIcon } from '@chakra-ui/icons'
import {
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  forwardRef,
  HStack,
  ListIcon,
  ListItem,
  ListItemProps,
  Text,
} from '@chakra-ui/react'
import { useState, VFC } from 'react'
import { StoryFragment } from 'types/graphql'
import StoryCell from '../../StoryCell'

const EstimateSelector: VFC = () => {
  return (
    <HStack>
      <ButtonGroup size="xs" isAttached variant="ghost">
        <Button>1</Button>
        <Button>3</Button>
        <Button>8</Button>
        <Button>20</Button>
        <Button>40</Button>
      </ButtonGroup>
    </HStack>
  )
}

const StoryItem = forwardRef<ListItemProps & { story: StoryFragment }, 'li'>(
  ({ story, ...props }, ref) => {
    const [opened, setOpened] = useState(false)
    return (
      <>
        {!opened && (
          <ListItem
            borderBottom="1px"
            borderColor="gray.200"
            py={1}
            px={2}
            onClick={() => setOpened(true)}
            {...props}
            ref={ref}
          >
            <HStack justify="space-between">
              <HStack>
                <ListIcon as={StarIcon} color="green.400" />
                <Text fontSize="sm" color="gray.400" w={5}>
                  {story.points}
                </Text>
                <Text fontSize="md">{story.title}</Text>
              </HStack>
              <HStack justify="flex-end">
                {story.isUnEstimated && <EstimateSelector />}
                {!story.isUnEstimated && <Badge>{story.state}</Badge>}
                <Checkbox />
              </HStack>
            </HStack>
          </ListItem>
        )}
        {opened && <StoryCell id={story.id} onClose={() => setOpened(false)} />}
      </>
    )
  }
)

export default StoryItem
