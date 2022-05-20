import {
  storyOrders,
  storyOrder,
  createStoryOrder,
  updateStoryOrder,
  deleteStoryOrder,
} from './storyOrders'
import type { StandardScenario } from './storyOrders.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('storyOrders', () => {
  scenario('returns all storyOrders', async (scenario: StandardScenario) => {
    const result = await storyOrders()

    expect(result.length).toEqual(Object.keys(scenario.storyOrder).length)
  })

  scenario(
    'returns a single storyOrder',
    async (scenario: StandardScenario) => {
      const result = await storyOrder({ id: scenario.storyOrder.one.id })

      expect(result).toEqual(scenario.storyOrder.one)
    }
  )

  scenario('creates a storyOrder', async (scenario: StandardScenario) => {
    const result = await createStoryOrder({
      input: {
        storyId: scenario.storyOrder.two.storyId,
        order: 1670766,
        updatedAt: '2022-05-20T20:47:19Z',
      },
    })

    expect(result.storyId).toEqual(scenario.storyOrder.two.storyId)
    expect(result.order).toEqual(1670766)
    expect(result.updatedAt).toEqual('2022-05-20T20:47:19Z')
  })

  scenario('updates a storyOrder', async (scenario: StandardScenario) => {
    const original = await storyOrder({ id: scenario.storyOrder.one.id })
    const result = await updateStoryOrder({
      id: original.id,
      input: { order: 4176238 },
    })

    expect(result.order).toEqual(4176238)
  })

  scenario('deletes a storyOrder', async (scenario: StandardScenario) => {
    const original = await deleteStoryOrder({ id: scenario.storyOrder.one.id })
    const result = await storyOrder({ id: original.id })

    expect(result).toEqual(null)
  })
})
