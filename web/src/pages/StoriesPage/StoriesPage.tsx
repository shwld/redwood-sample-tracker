import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import StoriesCell from 'src/components/Story/StoriesCell'

const StoriesPage = () => {
  const projectId = useParams().id
  return (
    <>
      <MetaTags title="Stories" description="Stories page" />

      <StoriesCell projectId={projectId} />
    </>
  )
}

export default StoriesPage
