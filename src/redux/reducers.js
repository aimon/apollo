import { combineReducers } from 'redux'

export const transcript = (state = '', action) => {
  if (action.type === 'GET_TRANSCRIPT') {
    return action.data
  }
  return state
}

export const activeTranscript = (state = '', action) => {
  if (action.type === 'SET_ACTIVE_TRANSCRIPT') {
    return action.data
  }
  return state
}

export const audioProgress = (state = { from: '00:00', to: '00:00' }, action) => {
  if (action.type === 'SET_AUDIO_PROGRESS') {
    return action.data
  }
  return state
}

export default combineReducers({
  transcript,
  activeTranscript,
  audioProgress
})
