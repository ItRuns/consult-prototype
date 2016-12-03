export default {
  name: 'maternal-uncles',
  inquiry: 'How many brothers does your mother have?',
  responseTypes: ['value', 'skip', 'unknown', 'refused'],
  type: 'simple-input',
  responses: {
    count: {
      type: 'number',
      label: 'Maternal Uncles:',
      handle: ({ commit }, count) => commit('updatePedigree', { maternalUncles: parseInt(count, 10) }),
    },
  },
}
