import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import UserFollow from '#models/user_follow'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (inertia: HttpContext['inertia'], page: string, props: Record<string, any>) =>
  (inertia as any).render(page, props)

export default class PublicProfilesController {
  async show({ params, inertia, response, auth }: HttpContext) {
    const user = await User.findOrFail(params.id)

    let isFollowing = false
    try {
      await auth.check()
      if (auth.user) {
        const follow = await UserFollow.query()
          .where('follower_id', auth.user.id)
          .where('followed_id', user.id)
          .first()
        isFollowing = !!follow
      }
    } catch {}

    const publicUser = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      country: user.country,
      initials: user.initials,
    }

    if (user.role === 'influencer') {
      return render(inertia, 'profile/influencer', { user: publicUser, isFollowing })
    }
    if (user.role === 'expert') {
      return render(inertia, 'profile/expert', { user: publicUser, isFollowing })
    }
    return response.redirect('/')
  }
}
