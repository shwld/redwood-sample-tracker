import { StarIcon } from '@chakra-ui/icons'
import {
  Badge,
  Checkbox,
  HStack,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react'

export const StoryItem: React.VFC = () => {
  return (
    <ListItem borderBottom="1px" borderColor="gray.200" py={1} px={2}>
      <HStack justify="space-between">
        <ListIcon as={StarIcon} color="green.400" />
        <Text fontSize="sm" color="gray.400" w={5}>
          5
        </Text>
        <Text fontSize="md">This is story</Text>
        <Badge>Unstarted</Badge>
        <Checkbox />
      </HStack>
    </ListItem>
  )
}
