import { db } from 'src/lib/db'

export function user(userId: string) {
  return db.user.findUnique({ where: { id: userId } })
}
