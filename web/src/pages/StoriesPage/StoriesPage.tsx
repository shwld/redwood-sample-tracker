import { MetaTags } from '@redwoodjs/web'
import Stories from 'src/components/Story/Stories'

const StoriesPage = () => {
  return (
    <>
      <MetaTags title="Stories" description="Stories page" />

      <Stories />
    </>
  )
}

export default StoriesPage
