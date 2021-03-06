import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  HStack,
  IconButton,
  BoxProps,
  forwardRef,
} from '@chakra-ui/react'
import { CalendarIcon, CloseIcon } from '@chakra-ui/icons'
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
      <HStack justify="space-between" align="center">
        <Text color="gray.100">{title}</Text>
        <HStack align="center">
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

const Card = forwardRef<BoxProps, 'div'>(({ children, ...props }, ref) => {
  return (
    <Box
      maxW={'380px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflowY="auto"
      {...props}
      ref={ref}
    >
      <List>{children}</List>
    </Box>
  )
})

export default Card
