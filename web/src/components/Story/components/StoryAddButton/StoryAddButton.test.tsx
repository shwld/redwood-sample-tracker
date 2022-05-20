import { render } from '@redwoodjs/testing/web'

import StoryAddButton from './StoryAddButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StoryAddButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StoryAddButton />)
    }).not.toThrow()
  })
})
