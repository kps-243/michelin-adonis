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
  'restaurants.index': {
    methods: ["GET","HEAD"],
    pattern: '/restaurants',
    tokens: [{"old":"/restaurants","type":0,"val":"restaurants","end":""}],
    types: placeholder as Registry['restaurants.index']['types'],
  },
  'restaurants.create': {
    methods: ["GET","HEAD"],
    pattern: '/restaurants/create',
    tokens: [{"old":"/restaurants/create","type":0,"val":"restaurants","end":""},{"old":"/restaurants/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['restaurants.create']['types'],
  },
  'restaurants.store': {
    methods: ["POST"],
    pattern: '/restaurants',
    tokens: [{"old":"/restaurants","type":0,"val":"restaurants","end":""}],
    types: placeholder as Registry['restaurants.store']['types'],
  },
  'restaurants.show': {
    methods: ["GET","HEAD"],
    pattern: '/restaurants/:id',
    tokens: [{"old":"/restaurants/:id","type":0,"val":"restaurants","end":""},{"old":"/restaurants/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['restaurants.show']['types'],
  },
  'restaurants.edit': {
    methods: ["GET","HEAD"],
    pattern: '/restaurants/:id/edit',
    tokens: [{"old":"/restaurants/:id/edit","type":0,"val":"restaurants","end":""},{"old":"/restaurants/:id/edit","type":1,"val":"id","end":""},{"old":"/restaurants/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['restaurants.edit']['types'],
  },
  'restaurants.update': {
    methods: ["PUT","PATCH"],
    pattern: '/restaurants/:id',
    tokens: [{"old":"/restaurants/:id","type":0,"val":"restaurants","end":""},{"old":"/restaurants/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['restaurants.update']['types'],
  },
  'restaurants.destroy': {
    methods: ["DELETE"],
    pattern: '/restaurants/:id',
    tokens: [{"old":"/restaurants/:id","type":0,"val":"restaurants","end":""},{"old":"/restaurants/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['restaurants.destroy']['types'],
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
