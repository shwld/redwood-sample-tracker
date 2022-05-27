import { render } from '@redwoodjs/testing/web'

import PeriodicAggregationContainer from './PeriodicAggregationContainer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PeriodicAggregationContainer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PeriodicAggregationContainer />)
    }).not.toThrow()
  })
})
