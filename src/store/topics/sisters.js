export default {
  name: 'sisters',
  inquiry: 'How many sisters do you have?',
  responseTypes: ['value', 'skip', 'unknown', 'refused'],
  type: 'simple-input',
  responses: {
    count: {
      type: 'number',
      label: 'Sisters:',
      handle: ({ commit }, count) => commit('updatePedigree', { sisters: parseInt(count, 10) }),
    },
  },
}
