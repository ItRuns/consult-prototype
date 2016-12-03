export default {
  name: 'paternal-aunts',
  inquiry: 'How many sisters does your father have?',
  responseTypes: ['value', 'skip', 'unknown', 'refused'],
  type: 'simple-input',
  responses: {
    count: {
      type: 'number',
      label: 'Paternal Aunts:',
      handle: ({ commit }, count) => commit('updatePedigree', { paternalAunts: parseInt(count, 10) }),
    },
  },
}
