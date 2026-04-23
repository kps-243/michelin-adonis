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
  restaurants: {
    index: typeof routes['restaurants.index']
    create: typeof routes['restaurants.create']
    store: typeof routes['restaurants.store']
    show: typeof routes['restaurants.show']
    edit: typeof routes['restaurants.edit']
    update: typeof routes['restaurants.update']
    destroy: typeof routes['restaurants.destroy']
  }
  profile: {
    show: typeof routes['profile.show']
    edit: typeof routes['profile.edit']
    update: typeof routes['profile.update']
  }
}
