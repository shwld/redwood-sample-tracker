import {
  storiesOfUserProject,
  storyOfUser,
  createStory,
  updateStory,
  deleteStory,
  reorderStories,
} from './stories'
import type { StandardScenario } from './stories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('storiesRepository', () => {
  scenario('returns all stories', async (scenario: StandardScenario) => {
    const result = await storiesOfUserProject({
      userId: scenario.user.one.id,
      projectId: scenario.project.one.id,
    })

    expect(result.length).toEqual(Object.keys(scenario.story).length)
  })

  scenario('returns a single story', async (scenario: StandardScenario) => {
    const result = await storyOfUser({
      id: scenario.story.one.id,
      userId: scenario.user.one.id,
    })

    expect(result.id).toEqual(scenario.story.one.id)
  })

  scenario('creates a story', async (scenario: StandardScenario) => {
    const result = await createStory({
      userId: scenario.user.one.id,
      projectId: scenario.project.one.id,
      destination: {
        position: 'CURRENT',
        index: 2,
      },
      input: { title: 'String', kind: 'FEATURE' },
    })

    expect(result.title).toEqual('String')
  })

  scenario('updates a story', async (scenario: StandardScenario) => {
    const original = await storyOfUser({
      id: scenario.story.one.id,
      userId: scenario.user.one.id,
    })
    const result = await updateStory({
      id: original.id,
      userId: scenario.user.one.id,
      input: { title: 'String Changed', kind: 'FEATURE' },
    })

    expect(result.title).toEqual('String Changed')
  })

  scenario('deletes a story', async (scenario: StandardScenario) => {
    const original = await deleteStory({
      id: scenario.story.one.id,
      userId: scenario.user.one.id,
    })
    const result = await storyOfUser({
      id: original.id,
      userId: scenario.user.one.id,
    })

    expect(result).toEqual(null)
  })

  scenario('reorder stories', async (scenario: StandardScenario) => {
    const effectedStories = await reorderStories({
      storyIds: [scenario.story.one.id],
      destination: {
        position: 'CURRENT',
        priority: 2,
      },
      userId: scenario.user.one.id,
    })

    const results = effectedStories
      .map((it) => ({
        title: it.title,
        priority: it.storyOrderPriority.priority,
      }))
      .sort((a, b) => (a.priority > b.priority ? -1 : 0))
    expect(results).toEqual([
      { title: 'Story 4', priority: 3 },
      { title: 'Story 1', priority: 2 },
      { title: 'Story 3', priority: 1 },
      { title: 'Story 2', priority: 0 },
    ])
  })
})
