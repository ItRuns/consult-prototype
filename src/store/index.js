import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

import state from './default-state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  // plugins: [createPersistedState()],
})

if (module.hot) {
  module.hot.accept([
    './default-state',
    './getters',
    './actions',
    './mutations',
    './topics',
  ], () => {
    store.hotUpdate({
      /* eslint-disable global-require */
      state: require('./default-state'),
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations'),
      /* eslint-enable global-require */
    })
  })
}

export default store
