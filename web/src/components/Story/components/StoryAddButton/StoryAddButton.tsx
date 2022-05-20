import { AddIcon } from '@chakra-ui/icons'
import { Button, ButtonProps, Icon } from '@chakra-ui/react'

const StoryAddButton: React.VFC<ButtonProps> = (props) => {
  return (
    <Button variant="ghost" color="white" size="sm" {...props}>
      <Icon as={AddIcon} />
      Add story
    </Button>
  )
}

export default StoryAddButton
