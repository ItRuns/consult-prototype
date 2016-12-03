export default {
  name: 'greeting',
  content: 'Hi there! I\'m <strong class="animated infinite tada">Dokbot</strong>, a semi-intelligent assistant. ' +
           'Dr Schiffman asked me to help you gather your family health history.',
  inquiry: 'Shall we get started?',
  responseTypes: ['value'],
  type: 'button-list',
  responses: {
    ready: {
      type: 'button',
      content: 'Ok, I\'m ready!',
      handle: () => ({ content: 'Great, let\'s get started.' }),
    },
    what_is_fhx: {
      type: 'button',
      content: 'What is family health history?',
      handle: () => ({
        next: 'greeting',
        content: 'Families have many factors in common, including their genes, environment, and lifestyle. ' +
                 'Together, these factors can give clues to medical conditions that may run in a family. ',
      }),
      /*
      handle: ({ commit }) => {
        commit('enableFeature', 'sideboard')
        commit('enableFeature', 'pedigreeClicking')
        return {
          next: 'greeting',
          content: 'Bitch, don\'t ask stupid questions.',
        }
      },
      */
    },
  },
}
