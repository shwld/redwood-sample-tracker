import type { StoriesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import Stories from 'src/components/Story/Stories/Stories'

export const QUERY = gql`
  fragment StoryFragment on Story {
    id
    type
    title
    state
  }
  query StoriesQuery($projectId: String!) {
    project(id: $projectId) {
      id
      currentVelocity
      stories {
        ...StoryFragment
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ project }: CellSuccessProps<StoriesQuery>) => {
  return (
    <Stories
      currentVelocity={project.currentVelocity}
      stories={project.stories}
    />
  )
}
