import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'PourToi': ExtractProps<(typeof import('../../inertia/pages/PourToi.tsx'))['default']>
    'Swipe': ExtractProps<(typeof import('../../inertia/pages/Swipe.tsx'))['default']>
    'restaurant/edit': ExtractProps<(typeof import('../../inertia/pages/restaurant/edit.tsx'))['default']>
    'restaurant/index': ExtractProps<(typeof import('../../inertia/pages/restaurant/index.tsx'))['default']>
    'restaurant/single': ExtractProps<(typeof import('../../inertia/pages/restaurant/single.tsx'))['default']>
    'Profile': ExtractProps<(typeof import('../../inertia/pages/Profile.tsx'))['default']>
    'Restaurants': ExtractProps<(typeof import('../../inertia/pages/Restaurants.tsx'))['default']>
    'Sejours': ExtractProps<(typeof import('../../inertia/pages/Sejours.tsx'))['default']>
    'profile/edit': ExtractProps<(typeof import('../../inertia/pages/profile/edit.tsx'))['default']>
  }
}
