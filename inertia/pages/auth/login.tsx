import { Form } from '@adonisjs/inertia/react'
import { Link } from '@inertiajs/react'

export default function Login() {
  return (
    <section className="auth-page px-4 pb-24 pt-6 sm:px-6">
      <div className="form-container auth-card">
        <div>
          <h1>Connexion</h1>
          <p>Entrez vos informations pour vous connecter à votre compte.</p>
        </div>

        <div>
          <Form route="session.store">
            {({ errors }) => (
              <>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="username"
                    data-invalid={errors.email ? 'true' : undefined}
                  />
                  {errors.email && <div>{errors.email}</div>}
                </div>

                <div>
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    data-invalid={errors.password ? 'true' : undefined}
                  />
                  {errors.password && <div>{errors.password}</div>}
                </div>

                <div>
                  <button type="submit" className="button">
                    Se connecter
                  </button>
                </div>
              </>
            )}
          </Form>
        </div>

        <p className="auth-switch">
          Pas encore de compte ?{' '}
          <Link href="/signup" className="auth-switch-link">
            Créer un compte
          </Link>
        </p>
      </div>
    </section>
  )
}
