import rootStore from '../index'

export default {
  name: 'progress-notice',
  content: 'So look, I need about 20 minutes of your time. Up above you\'ll see your progress so far. As I learn ' +
           'more about you and your family I may need to adjust the number of questions, so the estimate ' +
           'may change. I promise to try to keep it brief!',
  inquiry: '',
  responseTypes: ['value'],
  type: 'button-list',
  start: ({ commit }) => {
    commit('enableFeature', 'progress')

    // Enable notice arrows only once the UI is ready
    const stopWatcher = rootStore.watch(
      state => state.features.patientInput,
      () => {
        commit('displayNotice', 'progress')
        stopWatcher()
      }
    )
  },
  responses: {
    ok: {
      type: 'button',
      content: 'Ok, thank you!',
      handle: ({ commit }) => {
        commit('hideNotice', 'progress')
        return {
          content: 'Let\'s move on.',
        }
      },
    },
    really: {
      type: 'button',
      content: 'Brief? I\'m not convinced.',
      handle: () => ({
        next: 'progress-notice',
        content: 'Hah, sorry, I know this stuff is tedious. Rest assured, all your work here is saved. ' +
                 'If you need a break, feel free to close your browser window and come back later.',
      }),
    },
  },
}
