export const fullName = state =>
  [state.phr.firstName, state.phr.lastName].filter(v => v).join(' ')
