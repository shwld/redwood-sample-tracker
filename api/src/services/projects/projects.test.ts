import {
  projects,
  project,
  createProject,
  updateProject,
  deleteProject,
} from './projects'
import type { StandardScenario } from './projects.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('projects', () => {
  scenario('returns all projects', async (scenario: StandardScenario) => {
    const result = await projects()

    expect(result.length).toEqual(Object.keys(scenario.project).length)
  })

  scenario('returns a single project', async (scenario: StandardScenario) => {
    const result = await project({ id: scenario.project.one.id })

    expect(result).toEqual(scenario.project.one)
  })

  scenario('creates a project', async (scenario: StandardScenario) => {
    const result = await createProject({
      input: {
        name: 'String',
        privacy: 'PRIVATE',
        description: 'String',
        accountId: scenario.project.two.accountId,
        currentVelocity: 3481658,
        updatedAt: '2022-05-18T21:17:09Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.privacy).toEqual('PRIVATE')
    expect(result.description).toEqual('String')
    expect(result.accountId).toEqual(scenario.project.two.accountId)
    expect(result.currentVelocity).toEqual(3481658)
    expect(result.updatedAt).toEqual('2022-05-18T21:17:09Z')
  })

  scenario('updates a project', async (scenario: StandardScenario) => {
    const original = await project({ id: scenario.project.one.id })
    const result = await updateProject({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a project', async (scenario: StandardScenario) => {
    const original = await deleteProject({ id: scenario.project.one.id })
    const result = await project({ id: original.id })

    expect(result).toEqual(null)
  })
})
