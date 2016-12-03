import { camelCase } from 'lodash'
import greeting from './greeting'
import accountNotice from './account-notice'
import progressNotice from './progress-notice'
import rememberMe from './remember-me'
import accountEmail from './account-email'
import name from './name'
import gender from './gender'
import birthYear from './birth-year'
import pedigreeNotice from './pedigree-notice'
import sisters from './sisters'
import paternalUncles from './paternal-uncles'
import paternalAunts from './paternal-aunts'
import maternalUncles from './maternal-uncles'
import maternalAunts from './maternal-aunts'
import demoEnd from './demo-end'
import done from './done'

export const topics = {
  greeting,
  accountNotice,
  progressNotice,
  rememberMe,
  accountEmail,
  name,
  gender,
  birthYear,
  pedigreeNotice,
  sisters,
  paternalUncles,
  paternalAunts,
  maternalUncles,
  maternalAunts,
  demoEnd,
  done,
}

export const topicByName = topicName => topics[camelCase(topicName)]

export const nextTopic = ({ commit, state }) => {
  const phr = state.phr

  let progressIndex = 0
  const progressPoint = (inc = 1) => {
    progressIndex += inc
    if (state.progress.completed < progressIndex) {
      commit('updateProgress', { completed: progressIndex })
    }
  }

  if (!state.currentTopic) {
    return greeting
  }

  if (!phr.firstName && !phr.lastName) {
    return name
  }

  progressPoint()

  if (!state.features.account) {
    return accountNotice
  }

  progressPoint()

  if (!state.account.type) {
    return rememberMe
  }

  progressPoint()

  if (!state.features.progress) {
    return progressNotice
  }

  if (!phr.gender) {
    return gender
  }

  progressPoint()

  if (!phr.birthYear) {
    return birthYear
  }

  progressPoint()

  if (!state.features.sideboard) {
    return pedigreeNotice
  }

  progressPoint()

  if (typeof state.pedigree.sisters !== 'number') {
    return sisters
  }

  progressPoint()

  if (typeof state.pedigree.paternalUncles !== 'number') {
    return paternalUncles
  }

  progressPoint()

  if (typeof state.pedigree.paternalAunts !== 'number') {
    return paternalAunts
  }

  progressPoint()

  if (typeof state.pedigree.maternalUncles !== 'number') {
    return maternalUncles
  }

  progressPoint()

  if (typeof state.pedigree.maternalAunts !== 'number') {
    return maternalAunts
  }

  progressPoint()

  if (!state.features.pedigreeClicking) {
    return demoEnd
  }

  progressPoint()

  return done
}
