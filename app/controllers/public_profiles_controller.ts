import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (inertia: HttpContext['inertia'], page: string, props: Record<string, any>) =>
  (inertia as any).render(page, props)

export default class PublicProfilesController {
  async show({ params, inertia, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

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
      return render(inertia, 'profile/influencer', { user: publicUser })
    }
    if (user.role === 'expert') {
      return render(inertia, 'profile/expert', { user: publicUser })
    }
    return response.redirect('/')
  }
}
