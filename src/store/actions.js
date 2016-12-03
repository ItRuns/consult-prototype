import { nextTopic, topicByName } from './topics'

export const handlePatientMessage = (store, message) => {
  const commit = store.commit

  console.log('HPM:', message)

  commit('disableFeature', 'patientInput')
  commit('addMessage', {
    dokbot: false,
    topic: message.topic,
    content: message.content || message.response.content,
  })

  let reply = {}

  if (message.response.handle) {
    reply = message.response.handle(store, message.content) || {}
  }

  console.log('Got Reply:', reply)

  let next = reply.next || message.response.next || nextTopic(store)
  let content = reply.content || ''

  if (typeof next === 'string') {
    next = topicByName(next)
  }

  if (next.name !== message.topic.name && next.content) {
    content += ' <br/>' + next.content
  }

  if (next.inquiry) {
    content += ' <br/>' + next.inquiry
  }

  console.log('Next:', next)

  // Enforce a small delay to improve usability
  setTimeout(() => {
    store.dispatch('setTopic', next)
    commit('addMessage', { dokbot: true, content, topic: next })
  }, 750)
}

export const setTopic = (store, topic) => {
  if (typeof topic === 'string') {
    topic = topicByName(topic)
  }

  store.commit('updateTopic', topic)
  if (topic.start) {
    topic.start(store)
  }
}

export const startTopic = (store, topic) => {
  if (typeof topic === 'string') {
    topic = topicByName(topic)
  }

  let content = topic.content || ''

  if (topic.inquiry) {
    content += (content ? ' <br/>' : '') + topic.inquiry
  }

  store.dispatch('setTopic', topic)
  store.commit('addMessage', { dokbot: true, content, topic })
}

export const nextTopicState = store => {
  const topic = nextTopic(store)
  const content = topic.content + ' ' + topic.inquiry

  console.log('nextTopic:', topic, content)

  store.dispatch('setTopic', topic)
  store.commit('addMessage', { dokbot: true, content, topic })
}
