export default {
  accessToken: null,
  account: {
    type: null,
  },

  phr: {
    firstName: undefined,
    lastName: undefined,
    gender: undefined,
    birthYear: undefined,
  },
  currentTopic: undefined,
  currentSideboard: 'pedigree',
  selectedPatient: null,
  messages: [],

  pedigree: {
    brothers: null,
    sisters: null,
    paternalUncles: null,
    paternalAunts: null,
    maternalUncles: null,
    maternalAunts: null,
  },

  features: {
    account: false,
    dokbot: false,
    progress: false,
    sideboard: false,
    patientInput: false,
    patientAltInput: false,
    pedigree: false,
    pedigreeClicking: false,
    patientInfoPanel: false,
  },

  notices: {
    account: false,
    progress: false,
    sideboard: false,
  },

  progress: {
    completed: 0,
    total: 12,
  },

  systemError: null,
}
