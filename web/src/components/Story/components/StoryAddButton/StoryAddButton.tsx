import { AddIcon } from '@chakra-ui/icons'
import { Button, Icon } from '@chakra-ui/react'

const StoryAddButton: React.VFC = () => {
  return (
    <Button variant="ghost" color="white" size="sm">
      <Icon as={AddIcon} />
      Add story
    </Button>
  )
}

export default StoryAddButton
