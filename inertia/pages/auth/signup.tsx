import { Form } from '@adonisjs/inertia/react'
import { Link } from '@inertiajs/react'

export default function Signup() {
  return (
    <section className="auth-page px-4 pb-24 pt-6 sm:px-6">
      <div className="form-container auth-card auth-card-wide">
        <div>
          <h1>Créer un compte</h1>
          <p>Renseignez vos informations pour rejoindre Michelin Guide.</p>
        </div>

        <div>
          <Form route="new_account.store">
            {({ errors }) => (
              <>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName">Prenom *</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      data-invalid={errors.firstName ? 'true' : undefined}
                    />
                    {errors.firstName && <div>{errors.firstName}</div>}
                  </div>

                  <div>
                    <label htmlFor="lastName">Nom *</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      data-invalid={errors.lastName ? 'true' : undefined}
                    />
                    {errors.lastName && <div>{errors.lastName}</div>}
                  </div>
                </div>

                <div>
                  <label htmlFor="username">Nom d'utilisateur *</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    data-invalid={errors.username ? 'true' : undefined}
                  />
                  {errors.username && <div>{errors.username}</div>}
                </div>

                <div>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    data-invalid={errors.email ? 'true' : undefined}
                  />
                  {errors.email && <div>{errors.email}</div>}
                </div>

                <div>
                  <label htmlFor="password">Mot de passe *</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    data-invalid={errors.password ? 'true' : undefined}
                  />
                  {errors.password && <div>{errors.password}</div>}
                </div>

                <div>
                  <label htmlFor="passwordConfirmation">Confirmer le mot de passe *</label>
                  <input
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    autoComplete="new-password"
                    data-invalid={errors.passwordConfirmation ? 'true' : undefined}
                  />
                  {errors.passwordConfirmation && <div>{errors.passwordConfirmation}</div>}
                </div>

                <div>
                  <button type="submit" className="button">
                    Créer mon compte
                  </button>
                </div>
              </>
            )}
          </Form>
        </div>

        <p className="auth-switch">
          Deja inscrit ?{' '}
          <Link href="/login" className="auth-switch-link">
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  )
}
