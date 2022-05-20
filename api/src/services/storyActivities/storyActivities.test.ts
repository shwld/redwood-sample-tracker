import {
  storyActivities,
  storyActivity,
  createStoryActivity,
  updateStoryActivity,
  deleteStoryActivity,
} from './storyActivities'
import type { StandardScenario } from './storyActivities.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('storyActivities', () => {
  scenario(
    'returns all storyActivities',
    async (scenario: StandardScenario) => {
      const result = await storyActivities()

      expect(result.length).toEqual(Object.keys(scenario.storyActivity).length)
    }
  )

  scenario(
    'returns a single storyActivity',
    async (scenario: StandardScenario) => {
      const result = await storyActivity({ id: scenario.storyActivity.one.id })

      expect(result).toEqual(scenario.storyActivity.one)
    }
  )

  scenario('creates a storyActivity', async (scenario: StandardScenario) => {
    const result = await createStoryActivity({
      input: {
        storyId: scenario.storyActivity.two.storyId,
        userId: scenario.storyActivity.two.userId,
        content: 'String',
        updatedAt: '2022-05-20T20:47:58Z',
      },
    })

    expect(result.storyId).toEqual(scenario.storyActivity.two.storyId)
    expect(result.userId).toEqual(scenario.storyActivity.two.userId)
    expect(result.content).toEqual('String')
    expect(result.updatedAt).toEqual('2022-05-20T20:47:58Z')
  })

  scenario('updates a storyActivity', async (scenario: StandardScenario) => {
    const original = await storyActivity({ id: scenario.storyActivity.one.id })
    const result = await updateStoryActivity({
      id: original.id,
      input: { content: 'String2' },
    })

    expect(result.content).toEqual('String2')
  })

  scenario('deletes a storyActivity', async (scenario: StandardScenario) => {
    const original = await deleteStoryActivity({
      id: scenario.storyActivity.one.id,
    })
    const result = await storyActivity({ id: original.id })

    expect(result).toEqual(null)
  })
})
