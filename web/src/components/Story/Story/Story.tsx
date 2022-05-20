import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_STORY_MUTATION = gql`
  mutation DeleteStoryMutation($id: String!) {
    deleteStory(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Story = ({ story }) => {
  const [deleteStory] = useMutation(DELETE_STORY_MUTATION, {
    onCompleted: () => {
      toast.success('Story deleted')
      navigate(routes.stories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete story ' + id + '?')) {
      deleteStory({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Story {story.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{story.id}</td>
            </tr><tr>
              <th>Title</th>
              <td>{story.title}</td>
            </tr><tr>
              <th>Description</th>
              <td>{story.description}</td>
            </tr><tr>
              <th>State</th>
              <td>{formatEnum(story.state)}</td>
            </tr><tr>
              <th>Type</th>
              <td>{formatEnum(story.type)}</td>
            </tr><tr>
              <th>Points</th>
              <td>{story.points}</td>
            </tr><tr>
              <th>Requester id</th>
              <td>{story.requesterId}</td>
            </tr><tr>
              <th>Project id</th>
              <td>{story.projectId}</td>
            </tr><tr>
              <th>Release date</th>
              <td>{timeTag(story.releaseDate)}</td>
            </tr><tr>
              <th>Is icebox</th>
              <td>{checkboxInputTag(story.isIcebox)}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(story.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(story.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editStory({ id: story.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(story.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Story
