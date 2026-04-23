import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

const profileValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(1).maxLength(100).optional(),
    lastName: vine.string().trim().minLength(1).maxLength(100).optional(),
    username: vine.string().trim().minLength(2).maxLength(50),
    bio: vine.string().trim().maxLength(500).optional(),
    avatar: vine.string().trim().url().optional(),
    country: vine.string().trim().maxLength(100).optional(),
    role: vine.enum(['user', 'expert', 'influencer'] as const),
  })
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (inertia: HttpContext['inertia'], page: string, props: Record<string, any>) =>
  (inertia as any).render(page, props)

function toPlain(user: Awaited<ReturnType<typeof import('#models/user')['default']['findOrFail']>>) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    role: user.role ?? 'user',
    bio: user.bio,
    avatar: user.avatar,
    country: user.country,
    initials: user.initials,
  }
}

export default class ProfileController {
  async show({ inertia, auth }: HttpContext) {
    const user = auth.user!
    return render(inertia, 'Profile', { user: toPlain(user) })
  }

  async edit({ inertia, auth }: HttpContext) {
    const user = auth.user!
    return render(inertia, 'profile/edit', { user: toPlain(user) })
  }

  async update({ request, response, auth, session }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(profileValidator)
    await user.merge(payload).save()
    session.flash('success', 'Profil mis à jour avec succès')
    return response.redirect().toRoute('profile.show')
  }
}
