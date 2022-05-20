import { render } from '@redwoodjs/testing/web'

import Stories from './Stories'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Stories', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Stories />)
    }).not.toThrow()
  })
})
