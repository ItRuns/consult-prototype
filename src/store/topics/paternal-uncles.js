export default {
  name: 'paternal-uncles',
  inquiry: 'How many brothers does your father have?',
  responseTypes: ['value', 'skip', 'unknown', 'refused'],
  type: 'simple-input',
  responses: {
    count: {
      type: 'number',
      label: 'Paternal Uncles:',
      handle: ({ commit }, count) => commit('updatePedigree', { paternalUncles: parseInt(count, 10) }),
    },
  },
}
