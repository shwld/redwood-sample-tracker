import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  HStack,
  Badge,
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

export default function Card() {
  return (
    <Box
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
    >
      <List spacing={3}>
        <ListItem borderBottom="1px" borderColor="gray.200" py={1} px={2}>
          <HStack justify="space-between">
            <ListIcon as={StarIcon} color="green.400" />
            <Text fontSize="sm" color="gray.400" w={5}>
              5
            </Text>
            <Text fontSize="md">This is story</Text>
            <Badge>Unstarted</Badge>
          </HStack>
        </ListItem>
        <ListItem>
          <ListIcon as={StarIcon} color="green.400" />
          50 automation executions
        </ListItem>
        <ListItem>
          <ListIcon as={StarIcon} color="green.400" />
          50 identified users
        </ListItem>
        <ListItem>
          <ListIcon as={StarIcon} color="green.400" />
          All features
        </ListItem>
      </List>
      <Stack
        textAlign={'center'}
        p={6}
        color={useColorModeValue('gray.800', 'white')}
        align={'center'}
      >
        <Text
          fontSize={'sm'}
          fontWeight={500}
          bg={useColorModeValue('green.50', 'green.900')}
          p={2}
          px={3}
          color={'green.500'}
          rounded={'full'}
        >
          Hobby
        </Text>
      </Stack>
    </Box>
  )
}
