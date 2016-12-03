export default {
  name: 'name',
  content: '',
  inquiry: 'What is your full name?',
  responseTypes: ['value'],
  type: 'simple-input',
  responses: {
    name: {
      type: 'text',
      label: 'Your Full Name',
      handle: ({ commit }, content) => {
        const [firstName, lastName] = content.split(' ')

        if (!firstName) {
          return { content: 'Sorry, I need a response.' }
        }

        commit('changeRecords', { firstName, lastName })

        return {
          content: `Nice to meet you, ${firstName}!`,
        }
      },
    },
  },
}
