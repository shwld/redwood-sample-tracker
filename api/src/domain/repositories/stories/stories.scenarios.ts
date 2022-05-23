import type { Prisma } from '@prisma/client'

const USER_ID = 'bb3b08c2-5060-557f-b09b-edfc9c8385af'
const ACCOUNT_ID = '4f746208-b4ba-5406-a8f1-ddcfaeae6479'
const PROJECT_ID = '77b553fe-ee7a-5440-91b7-27c8d0e1281c'
export const standard = defineScenario<
  Prisma.StoryCreateArgs | Prisma.UserCreateArgs | Prisma.ProjectCreateArgs
>({
  user: {
    one: {
      data: {
        id: USER_ID,
        email: 'String3950782',
        name: 'String',
        avatarImageUrl: 'String',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2022-05-18T19:51:17Z',
        accounts: {
          create: {
            id: ACCOUNT_ID,
            name: 'String',
            updatedAt: '2022-05-18T19:55:24Z',
          },
        },
      },
    },
  },
  project: {
    one: {
      data: {
        id: PROJECT_ID,
        name: 'String',
        privacy: 'PRIVATE',
        description: 'String',
        currentVelocity: 1560438,
        updatedAt: '2022-05-18T21:17:09Z',
        accountId: ACCOUNT_ID,
      },
    },
  },
  story: {
    one: {
      data: {
        title: 'String',
        updatedAt: '2022-05-20T20:38:49Z',
        projectId: PROJECT_ID,
      },
    },
    two: {
      data: {
        title: 'String',
        updatedAt: '2022-05-20T20:38:49Z',
        projectId: PROJECT_ID,
      },
    },
  },
})

export type StandardScenario = typeof standard
