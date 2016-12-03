/* global Audio */
import { Notification } from 'element-ui'
import topics from './topics'

const received = new Audio('/static/audio/receive.mp3')
const sent = new Audio('/static/audio/sent.mp3')

received.volume = 0.1
sent.volume = 0.1

export const addMessage = (state, message) => {
  state.messages.push(Object.assign({ id: Date.now() }, message))

  // No sound needed on first message
  if (state.messages.length !== 1) {
    if (message.dokbot) {
      received.play()
    } else {
      sent.play()
    }
  }
}

export const selectPatient = (state, patientId) => {
  state.selectedPatient = patientId
}

export const updatePedigree = (state, changes) => {
  Object.assign(state.pedigree, changes)
}

export const updateProgress = (state, progress) => {
  Object.assign(state.progress, progress)
}

export const updateTopic = (state, topic) => {
  console.log('New topic:', topic)
  if (typeof topic === 'string') {
    state.currentTopic = topics[topic]
  } else {
    state.currentTopic = topic
  }
}

export const updateAccount = (state, properties) => {
  state.account = Object.assign({}, state.account, properties)
}

export const displayNotice = (state, type) => {
  state.notices[type] = true
}

export const enableFeature = (state, type) => {
  state.features[type] = true
}

export const disableFeature = (state, type) => {
  state.features[type] = false
}

export const hideNotice = (state, type) => {
  state.notices[type] = false
}

export const setThinking = (state, thinking) => {
  state.thinking = thinking
}

export const changeRecords = (state, records) => {
  Object.assign(state.phr, records)
}

export const systemError = (state, err) => {
  state.systemError = err
  if (err.body && err.body.error) {
    console.error(`System Error (${err.body.error.status}):`, err.body.error)

    // eslint-disable-next-line new-cap
    Notification({
      title: `System Error (${err.body.error.status})`,
      message: err.body.error.message,
      type: 'error',
    })
  } else {
    console.log('System Error:', err)
  }
}
