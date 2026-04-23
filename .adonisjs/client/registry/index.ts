/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'Swipe': {
    methods: ["GET","HEAD"],
    pattern: '/decouverte',
    tokens: [{"old":"/decouverte","type":0,"val":"decouverte","end":""}],
    types: placeholder as Registry['Swipe']['types'],
  },
  'PourToi': {
    methods: ["GET","HEAD"],
    pattern: '/pour-toi',
    tokens: [{"old":"/pour-toi","type":0,"val":"pour-toi","end":""}],
    types: placeholder as Registry['PourToi']['types'],
  },
  'map': {
    methods: ["GET","HEAD"],
    pattern: '/map',
    tokens: [{"old":"/map","type":0,"val":"map","end":""}],
    types: placeholder as Registry['map']['types'],
  },
  'search': {
    methods: ["GET","HEAD"],
    pattern: '/search',
    tokens: [{"old":"/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['search']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/users/:id',
    tokens: [{"old":"/users/:id","type":0,"val":"users","end":""},{"old":"/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'restaurants.index': {
    methods: ["GET","HEAD"],
    pattern: '/restaurants',
    tokens: [{"old":"/restaurants","type":0,"val":"restaurants","end":""}],
    types: placeholder as Registry['restaurants.index']['types'],
  },
  'restaurants.show': {
    methods: ["GET","HEAD"],
    pattern: '/restaurants/:id',
    tokens: [{"old":"/restaurants/:id","type":0,"val":"restaurants","end":""},{"old":"/restaurants/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['restaurants.show']['types'],
  },
  'admin.restaurants.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/restaurants',
    tokens: [{"old":"/admin/restaurants","type":0,"val":"admin","end":""},{"old":"/admin/restaurants","type":0,"val":"restaurants","end":""}],
    types: placeholder as Registry['admin.restaurants.index']['types'],
  },
  'admin.restaurants.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/restaurants/create',
    tokens: [{"old":"/admin/restaurants/create","type":0,"val":"admin","end":""},{"old":"/admin/restaurants/create","type":0,"val":"restaurants","end":""},{"old":"/admin/restaurants/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.restaurants.create']['types'],
  },
  'admin.restaurants.store': {
    methods: ["POST"],
    pattern: '/admin/restaurants',
    tokens: [{"old":"/admin/restaurants","type":0,"val":"admin","end":""},{"old":"/admin/restaurants","type":0,"val":"restaurants","end":""}],
    types: placeholder as Registry['admin.restaurants.store']['types'],
  },
  'admin.restaurants.show': {
    methods: ["GET","HEAD"],
    pattern: '/admin/restaurants/:id',
    tokens: [{"old":"/admin/restaurants/:id","type":0,"val":"admin","end":""},{"old":"/admin/restaurants/:id","type":0,"val":"restaurants","end":""},{"old":"/admin/restaurants/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.restaurants.show']['types'],
  },
  'admin.restaurants.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/restaurants/:id/edit',
    tokens: [{"old":"/admin/restaurants/:id/edit","type":0,"val":"admin","end":""},{"old":"/admin/restaurants/:id/edit","type":0,"val":"restaurants","end":""},{"old":"/admin/restaurants/:id/edit","type":1,"val":"id","end":""},{"old":"/admin/restaurants/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin.restaurants.edit']['types'],
  },
  'admin.restaurants.update': {
    methods: ["PUT","PATCH"],
    pattern: '/admin/restaurants/:id',
    tokens: [{"old":"/admin/restaurants/:id","type":0,"val":"admin","end":""},{"old":"/admin/restaurants/:id","type":0,"val":"restaurants","end":""},{"old":"/admin/restaurants/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.restaurants.update']['types'],
  },
  'admin.restaurants.destroy': {
    methods: ["DELETE"],
    pattern: '/admin/restaurants/:id',
    tokens: [{"old":"/admin/restaurants/:id","type":0,"val":"admin","end":""},{"old":"/admin/restaurants/:id","type":0,"val":"restaurants","end":""},{"old":"/admin/restaurants/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.restaurants.destroy']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'profile.edit': {
    methods: ["GET","HEAD"],
    pattern: '/profile/edit',
    tokens: [{"old":"/profile/edit","type":0,"val":"profile","end":""},{"old":"/profile/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['profile.edit']['types'],
  },
  'profile.update': {
    methods: ["PUT"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.update']['types'],
  },
  'users.follow': {
    methods: ["POST"],
    pattern: '/users/:id/follow',
    tokens: [{"old":"/users/:id/follow","type":0,"val":"users","end":""},{"old":"/users/:id/follow","type":1,"val":"id","end":""},{"old":"/users/:id/follow","type":0,"val":"follow","end":""}],
    types: placeholder as Registry['users.follow']['types'],
  },
  'restaurants.favorite': {
    methods: ["POST"],
    pattern: '/restaurants/:id/favorite',
    tokens: [{"old":"/restaurants/:id/favorite","type":0,"val":"restaurants","end":""},{"old":"/restaurants/:id/favorite","type":1,"val":"id","end":""},{"old":"/restaurants/:id/favorite","type":0,"val":"favorite","end":""}],
    types: placeholder as Registry['restaurants.favorite']['types'],
  },
  'restaurants.visit': {
    methods: ["POST"],
    pattern: '/restaurants/:id/visit',
    tokens: [{"old":"/restaurants/:id/visit","type":0,"val":"restaurants","end":""},{"old":"/restaurants/:id/visit","type":1,"val":"id","end":""},{"old":"/restaurants/:id/visit","type":0,"val":"visit","end":""}],
    types: placeholder as Registry['restaurants.visit']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
