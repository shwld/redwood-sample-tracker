import { AddIcon } from '@chakra-ui/icons'
import { Button, Icon } from '@chakra-ui/react'
import { MetaTags } from '@redwoodjs/web'
import Card, { Head } from 'src/components/Story/components/Card/Card'
import StoryLayout from 'src/layouts/StoryLayout/StoryLayout'

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

const StoriesPage = () => {
  return (
    <>
      <MetaTags title="Stories" description="Stories page" />

      <StoryLayout>
        <DoneCard />
        <CurrentCard />
        <BacklogCard />
        <IceboxCard />
      </StoryLayout>
    </>
  )
}

export default StoriesPage
