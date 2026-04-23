import type { HttpContext } from '@adonisjs/core/http'
import UserFollow from '#models/user_follow'
import User from '#models/user'

export default class FollowsController {
  async toggle({ params, auth, response }: HttpContext) {
    const currentUser = auth.user!
    const targetId = Number(params.id)

    const target = await User.find(targetId)
    if (!target || !['influencer', 'expert'].includes(target.role)) {
      return response.badRequest({ error: 'Invalid user' })
    }

    const existing = await UserFollow.query()
      .where('follower_id', currentUser.id)
      .where('followed_id', targetId)
      .first()

    if (existing) {
      await existing.delete()
      return response.json({ following: false })
    }

    await UserFollow.create({ followerId: currentUser.id, followedId: targetId })
    return response.json({ following: true })
  }
}
