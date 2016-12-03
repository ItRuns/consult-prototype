import store from '../index'

export default {
  name: 'account-notice',
  content: 'I\'m taking note of your name up above. You can click it at any time to safely close ' +
           'your consultation or to access settings related to your account.',
  inquiry: 'Make sense?',
  responseTypes: ['value'],
  type: 'button-list',
  start: ({ commit }) => {
    commit('enableFeature', 'account')

    // Enable notice arrows only once the UI is ready
    const stopWatcher = store.watch(
      state => state.features.patientInput,
      () => {
        commit('displayNotice', 'account')
        stopWatcher()
      }
    )
  },
  responses: {
    ok: {
      type: 'button',
      content: 'Ok, got it!',
      handle: ({ commit }) => {
        commit('hideNotice', 'account')
      },
    },
  },
}
