export default {
  name: 'account-email',
  inquiry: 'What is your email address?',
  responseTypes: ['value'],
  type: 'simple-input',
  responses: {
    email: {
      type: 'text',
      label: 'Email Address:',
      handle: (store, email) => {
        if (!email.match(/^[^@]+@[^@]+$/)) {
          return {
            next: 'account-email',
            content: 'Sorry, I\'ve never seen an email address like that!',
          }
        }

        store.commit('updateAccount', { type: 'email', email })

        const firstName = store.state.phr.firstName

        return {
          content: `Thanks, ${firstName}. I'm sending you an email that will allow you to safely and ` +
                   'securely continue your consultation with me at any time.',
        }
      },
    },
    google: {
      type: 'button',
      content: 'Google',
      handle: () => ({
        content: '[Sorry, Social Auth is actually not yet implemented]<br/>',
      }),
    },
    facebook: {
      type: 'button',
      style: {
        backgroundColor: '#39569c',
        color: 'white',
      },
      content: 'Facebook',
      handle: () => ({
        content: '[Sorry, Social Auth is actually not yet implemented]<br/>',
      }),
    },
  },
}
