export default {
  name: 'birth-year',
  content: '',
  inquiry: 'In which year were you born?',
  responseTypes: ['value', 'skip', 'unknown', 'refused'],
  type: 'simple-input',
  responses: {
    dob: {
      type: 'number',
      label: 'Year Born:',
      handle: ({ commit }, birthYear) => {
        commit('changeRecords', { birthYear })

        return {
          content: 'Thanks.',
        }
      },
    },
  },
}
