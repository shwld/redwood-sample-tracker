import { AddIcon } from '@chakra-ui/icons'
import { Button, HStack, Icon } from '@chakra-ui/react'
import Card, { Head } from 'src/components/Story/components/Card/Card'
import { StoryFragment } from 'types/graphql'

const DoneCard: React.VFC = () => {
  return (
    <Card>
      <Head title="Done" />
    </Card>
  )
}

const CurrentCard: React.VFC = () => {
  return (
    <Card>
      <Head title="Current Iteration">
        <Button variant="ghost" color="white" size="sm">
          <Icon as={AddIcon} />
          Add story
        </Button>
      </Head>
    </Card>
  )
}

const BacklogCard: React.VFC = () => {
  return (
    <Card>
      <Head title="Backlog">
        <Button variant="ghost" color="white" size="sm">
          <Icon as={AddIcon} />
          Add story
        </Button>
      </Head>
    </Card>
  )
}

const IceboxCard: React.VFC = () => {
  return (
    <Card>
      <Head title="Icebox">
        <Button variant="ghost" color="white" size="sm">
          <Icon as={AddIcon} />
          Add story
        </Button>
      </Head>
    </Card>
  )
}

const Stories: React.VFC<{
  currentVelocity: number
  stories: StoryFragment[]
}> = ({ currentVelocity, stories }) => {
  return (
    <HStack align="stretch" h="calc(100vh - 5rem)">
      <DoneCard />
      <CurrentCard />
      <BacklogCard />
      <IceboxCard />
    </HStack>
  )
}

export default Stories
