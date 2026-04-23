import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'Swipe': { paramsTuple?: []; params?: {} }
    'PourToi': { paramsTuple?: []; params?: {} }
    'map': { paramsTuple?: []; params?: {} }
    'restaurants.index': { paramsTuple?: []; params?: {} }
    'restaurants.create': { paramsTuple?: []; params?: {} }
    'restaurants.store': { paramsTuple?: []; params?: {} }
    'restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restaurants.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restaurants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restaurants.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.edit': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'Swipe': { paramsTuple?: []; params?: {} }
    'PourToi': { paramsTuple?: []; params?: {} }
    'map': { paramsTuple?: []; params?: {} }
    'restaurants.index': { paramsTuple?: []; params?: {} }
    'restaurants.create': { paramsTuple?: []; params?: {} }
    'restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restaurants.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.edit': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'Swipe': { paramsTuple?: []; params?: {} }
    'PourToi': { paramsTuple?: []; params?: {} }
    'map': { paramsTuple?: []; params?: {} }
    'restaurants.index': { paramsTuple?: []; params?: {} }
    'restaurants.create': { paramsTuple?: []; params?: {} }
    'restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'restaurants.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.edit': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'restaurants.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'restaurants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.update': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'restaurants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'restaurants.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}