import { render } from '@redwoodjs/testing/web'

import StoriesPage from './StoriesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StoriesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StoriesPage />)
    }).not.toThrow()
  })
})
