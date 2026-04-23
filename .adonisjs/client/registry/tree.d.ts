/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  home: typeof routes['home']
  swipe: typeof routes['Swipe']
  pourToi: typeof routes['PourToi']
  map: typeof routes['map']
  search: typeof routes['search']
  users: {
    show: typeof routes['users.show']
    follow: typeof routes['users.follow']
  }
  restaurants: {
    index: typeof routes['restaurants.index']
    show: typeof routes['restaurants.show']
    favorite: typeof routes['restaurants.favorite']
    visit: typeof routes['restaurants.visit']
  }
  admin: {
    restaurants: {
      index: typeof routes['admin.restaurants.index']
      create: typeof routes['admin.restaurants.create']
      store: typeof routes['admin.restaurants.store']
      show: typeof routes['admin.restaurants.show']
      edit: typeof routes['admin.restaurants.edit']
      update: typeof routes['admin.restaurants.update']
      destroy: typeof routes['admin.restaurants.destroy']
    }
  }
  profile: {
    show: typeof routes['profile.show']
    edit: typeof routes['profile.edit']
    update: typeof routes['profile.update']
  }
}
