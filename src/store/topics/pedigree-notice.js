export default {
  name: 'sideboard-notice',
  content: 'Let\'s move on to exploring the health history of ' +
           'you and your family. To keep track of things, I\'m making room for a simple chart about your ' +
           'family called a <strong>pedigree</strong>. <br/>' +
           'The pedigree currently only shows you and your parents. Let\'s work on that!',
  inquiry: 'How many brothers do you have?',
  responseTypes: ['value'],
  type: 'simple-input',
  start: ({ commit }) => {
    setTimeout(() => commit('enableFeature', 'sideboard'), 4000)
    // commit('enableFeature', 'sideboard')
  },
  responses: {
    count: {
      type: 'number',
      label: 'Brothers:',
      handle: ({ commit }, count) => commit('updatePedigree', { brothers: parseInt(count, 10) }),
    },
  },
}
