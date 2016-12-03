import FemaleProfile from '../../assets/profile-female.png'
import MaleProfile from '../../assets/profile-male.png'

export default {
  name: 'gender',
  content: '',
  inquiry: 'What gender were you assigned at birth?',
  responseTypes: ['value', 'unknown', 'refused'],
  type: 'button-list',
  start: ({ commit }) => {
    commit('enableFeature', 'patientAltInput')
  },
  responses: {
    female: {
      type: 'image',
      image: FemaleProfile,
      label: 'Female',
      content: 'Female',
      class: 'profile-button profile-female',
      handle: ({ commit }) => {
        commit('changeRecords', { gender: 'female' })

        return {
          content: 'Thank you, madam!',
        }
      },
    },
    male: {
      type: 'image',
      image: MaleProfile,
      label: 'Male',
      content: 'Male',
      class: 'profile-button profile-male',
      handle: ({ commit }) => {
        commit('changeRecords', { gender: 'male' })

        return {
          content: 'Thank you, sir!',
        }
      },
    },
  },
}
