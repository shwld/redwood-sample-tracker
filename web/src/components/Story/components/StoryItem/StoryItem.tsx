import { StarIcon } from '@chakra-ui/icons'
import {
  Badge,
  Checkbox,
  forwardRef,
  HStack,
  ListIcon,
  ListItem,
  ListItemProps,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { StoryFragment } from 'types/graphql'
import StoryCell from '../../StoryCell'

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
                  {/*story.points*/}
                  {story.orderPriority.priority}
                </Text>
                <Text fontSize="md">{story.title}</Text>
              </HStack>
              <Badge>{story.state}</Badge>
              <Checkbox />
            </HStack>
          </ListItem>
        )}
        {opened && <StoryCell id={story.id} onClose={() => setOpened(false)} />}
      </>
    )
  }
)

export default StoryItem
