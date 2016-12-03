export default {
  name: 'maternal-aunts',
  inquiry: 'How many sisters does your mother have?',
  responseTypes: ['value', 'skip', 'unknown', 'refused'],
  type: 'simple-input',
  responses: {
    count: {
      type: 'number',
      label: 'Maternal Aunts:',
      handle: (store, count) => {
        store.commit('updatePedigree', { maternalAunts: parseInt(count, 10) })

        if (!store.state.features.pedigreeClicking) {
          return {
            content: 'What a great looking family! By the way, you can click on any of your ' +
                     'family members to view or modify any of the information we\'ve collected.',
          }
        }

        return null
      },
    },
  },
}
