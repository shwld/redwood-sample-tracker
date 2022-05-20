import { HStack } from '@chakra-ui/react'
import Card, { Head } from 'src/components/Story/components/Card/Card'
import { StoryFragment } from 'types/graphql'
import StoryAddButton from '../components/StoryAddButton/StoryAddButton'

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
        <StoryAddButton />
      </Head>
    </Card>
  )
}

const BacklogCard: React.VFC = () => {
  return (
    <Card>
      <Head title="Backlog">
        <StoryAddButton />
      </Head>
    </Card>
  )
}

const IceboxCard: React.VFC = () => {
  return (
    <Card>
      <Head title="Icebox">
        <StoryAddButton />
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
