import { StarIcon } from '@chakra-ui/icons'
import {
  Badge,
  Checkbox,
  HStack,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { StoryFragment } from 'types/graphql'

const StoryItem: React.VFC<{
  story: StoryFragment
  onClick?(): void
}> = ({ story, onClick }) => {
  return (
    <ListItem
      borderBottom="1px"
      borderColor="gray.200"
      py={1}
      px={2}
      onClick={onClick}
    >
      <HStack justify="space-between">
        <HStack>
          <ListIcon as={StarIcon} color="green.400" />
          <Text fontSize="sm" color="gray.400" w={5}>
            {story.points}
          </Text>
          <Text fontSize="md">{story.title}</Text>
        </HStack>
        <Badge>{story.state}</Badge>
        <Checkbox />
      </HStack>
    </ListItem>
  )
}

export default StoryItem
