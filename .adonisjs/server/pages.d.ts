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
    'admin/restaurant/edit': ExtractProps<(typeof import('../../inertia/pages/admin/restaurant/edit.tsx'))['default']>
    'admin/restaurant/index': ExtractProps<(typeof import('../../inertia/pages/admin/restaurant/index.tsx'))['default']>
    'admin/restaurant/single': ExtractProps<(typeof import('../../inertia/pages/admin/restaurant/single.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'Map': ExtractProps<(typeof import('../../inertia/pages/Map.tsx'))['default']>
    'PourToi': ExtractProps<(typeof import('../../inertia/pages/PourToi.tsx'))['default']>
    'Profile': ExtractProps<(typeof import('../../inertia/pages/Profile.tsx'))['default']>
    'profile/edit': ExtractProps<(typeof import('../../inertia/pages/profile/edit.tsx'))['default']>
    'profile/expert': ExtractProps<(typeof import('../../inertia/pages/profile/expert.tsx'))['default']>
    'profile/influencer': ExtractProps<(typeof import('../../inertia/pages/profile/influencer.tsx'))['default']>
    'Restaurants': ExtractProps<(typeof import('../../inertia/pages/Restaurants.tsx'))['default']>
    'restaurants/index': ExtractProps<(typeof import('../../inertia/pages/restaurants/index.tsx'))['default']>
    'restaurants/single': ExtractProps<(typeof import('../../inertia/pages/restaurants/single.tsx'))['default']>
    'Search': ExtractProps<(typeof import('../../inertia/pages/Search.tsx'))['default']>
    'Sejours': ExtractProps<(typeof import('../../inertia/pages/Sejours.tsx'))['default']>
    'Swipe': ExtractProps<(typeof import('../../inertia/pages/Swipe.tsx'))['default']>
  }
}
