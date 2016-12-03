export default {
  name: 'remember-me',
  content: 'In order to save your work we need a way to identify you. This will allow ' +
           'you to safely resume your session at any time.',
  inquiry: 'How would you like to identify yourself?',
  responseTypes: ['value'],
  type: 'button-list',
  responses: {
    email: {
      type: 'button',
      content: 'Via Email',
      next: 'account-email',
    },
    google: {
      type: 'button',
      content: 'Google',
      handle: ({ commit }) => {
        commit('updateAccount', { type: 'google' })

        return {
          next: 'remember-me',
          content: '[Sorry, Social Auth not yet implemented]',
        }
      },
    },
    facebook: {
      type: 'button',
      style: {
        backgroundColor: '#39569c',
        color: 'white',
      },
      content: 'Facebook',
      handle: ({ commit }) => {
        commit('updateAccount', { type: 'google' })

        return {
          next: 'remember-me',
          content: '[Sorry, Social Auth not yet implemented]',
        }
      },
    },
  },
}
