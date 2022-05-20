import { labels, label, createLabel, updateLabel, deleteLabel } from './labels'
import type { StandardScenario } from './labels.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('labels', () => {
  scenario('returns all labels', async (scenario: StandardScenario) => {
    const result = await labels()

    expect(result.length).toEqual(Object.keys(scenario.label).length)
  })

  scenario('returns a single label', async (scenario: StandardScenario) => {
    const result = await label({ id: scenario.label.one.id })

    expect(result).toEqual(scenario.label.one)
  })

  scenario('creates a label', async () => {
    const result = await createLabel({
      input: {
        name: 'String',
        color: 'String',
        updatedAt: '2022-05-20T20:47:37Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.color).toEqual('String')
    expect(result.updatedAt).toEqual('2022-05-20T20:47:37Z')
  })

  scenario('updates a label', async (scenario: StandardScenario) => {
    const original = await label({ id: scenario.label.one.id })
    const result = await updateLabel({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a label', async (scenario: StandardScenario) => {
    const original = await deleteLabel({ id: scenario.label.one.id })
    const result = await label({ id: original.id })

    expect(result).toEqual(null)
  })
})
