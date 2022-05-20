import { render } from '@redwoodjs/testing/web'

import StoryItem from './StoryItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StoryItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StoryItem />)
    }).not.toThrow()
  })
})
