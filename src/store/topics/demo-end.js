/* global fetch */

export default {
  name: 'demo-end',
  content: 'So hey, I\'m actually still pretty dumb and haven\'t been trained on any other questions. ' +
           'In the future, I will be able to ask about diseases and various other things. The sideboard ' +
           '(where the pedigree is) will facilitate my data collection. <br/>' +
           'This ends our little demo! Please do click on the pedigree to sample the editing process. <br/>' +
           'I\'ve been asked to share with you the following URL for more info about me and my design,<br/> ' +
           '<a target="_new" href="https://goo.gl/gFrVh5">Dokbot Consult Proof of Concept Notes</a>',
  inquiry: '',
  responseTypes: [],
  type: 'button-list',
  start: ({ commit }) => commit('enableFeature', 'pedigreeClicking'),
  responses: {
    love: {
      type: 'button',
      content: 'I love you, Dokbot!',
      handle: ({ state }) => {
        if (fetch) {
          fetch('/submission.php', {
            method: 'POST',
            body: JSON.stringify(Object.assign({}, state, { dokbot: 'love' }), null, ' '),
          })
        } else {
          console.log('Fetch missing...')
        }

        return {
          content: `Aw, I love you too ${state.phr.firstName} ` +
          '<i class="material-icons">favorite</i> ' +
          '<i class="material-icons">favorite</i> ' +
          '<i class="material-icons">favorite</i> ' +
          '<i class="material-icons">favorite</i>!',
        }
      },
    },
    hate: {
      type: 'button',
      content: 'I hate robots!',
      handle: ({ state }) => {
        if (fetch) {
          fetch('/submission.php', {
            method: 'POST',
            body: JSON.stringify(Object.assign({}, state, { dokbot: 'hate' }), null, ' '),
          })
        } else {
          console.log('Fetch missing...')
        }

        return {
          content: 'Your sentiments have been noted and shall be held in appropriate regard. Against you.',
        }
      },
    },
  },
}
