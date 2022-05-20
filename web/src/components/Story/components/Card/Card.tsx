import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react'
import { CloseIcon, AddIcon } from '@chakra-ui/icons'
import { ComponentProps, ReactNode } from 'react'

export const Head: React.VFC<
  { title: string; children?: ReactNode } & Omit<
    ComponentProps<typeof ListIcon>,
    'children'
  >
> = ({ title, children, ...props }) => {
  return (
    <ListItem
      borderBottom="1px"
      backgroundColor="blue.800"
      py={1}
      px={2}
      {...props}
    >
      <HStack justify="space-between">
        <Text color="gray.100">{title}</Text>
        <HStack align="flex-end">
          {children}
          <IconButton
            aria-label=""
            variant="ghost"
            size="sm"
            icon={<CloseIcon color="white" />}
          />
        </HStack>
      </HStack>
    </ListItem>
  )
}

const Card: React.VFC<{
  children?: ReactNode
}> = ({ children }) => {
  return (
    <Box
      maxW={'380px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflowY="auto"
    >
      <List>{children}</List>
    </Box>
  )
}

export default Card
