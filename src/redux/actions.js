import transcript from './transcript.json'

export const getTranscript = () => {
  return dispatch => {
    dispatch({
      type: 'GET_TRANSCRIPT',
      data: null
    })
    // added few delays to handle the loading of json file
    setTimeout(() => {
      dispatch({
        type: 'GET_TRANSCRIPT',
        data: transcript
      })
    }, 100)
  }
}

export const setActiveTranscript = data => {
  return {
    type: 'SET_ACTIVE_TRANSCRIPT',
    data
  }
}

export const setAudioProgress = data => {
  return {
    type: 'SET_AUDIO_PROGRESS',
    data
  }
}
