import { render } from '@redwoodjs/testing/web'

import ProjectMemberSelect from './ProjectMemberSelect'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProjectMemberSelect', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProjectMemberSelect />)
    }).not.toThrow()
  })
})
