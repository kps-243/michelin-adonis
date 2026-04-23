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
    'restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.restaurants.index': { paramsTuple?: []; params?: {} }
    'admin.restaurants.create': { paramsTuple?: []; params?: {} }
    'admin.restaurants.store': { paramsTuple?: []; params?: {} }
    'admin.restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.restaurants.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.restaurants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.restaurants.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
    'restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.restaurants.index': { paramsTuple?: []; params?: {} }
    'admin.restaurants.create': { paramsTuple?: []; params?: {} }
    'admin.restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.restaurants.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
    'restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.restaurants.index': { paramsTuple?: []; params?: {} }
    'admin.restaurants.create': { paramsTuple?: []; params?: {} }
    'admin.restaurants.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.restaurants.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.edit': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'admin.restaurants.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'admin.restaurants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.update': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'admin.restaurants.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'admin.restaurants.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}