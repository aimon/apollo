import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTranscript, setActiveTranscript, setAudioProgress } from '../../redux/actions'
import { formatTime } from '../../helpers'
import audio from '../../assets/media/transcript.wav'

const Container = ({ children }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    transcript: state.transcript,
    activeTranscript: state.activeTranscript,
    audioProgress: state.audioProgress
  }))
  const audioRef = useRef(null)
  const wordsRef = useRef([])

  useEffect(() => {
    dispatch(
      getTranscript()
    )
  }, [])

  useEffect(() => {
    if (state.transcript) {
      audioRef.current.setAttribute('src', audio)
    }
  }, [state.transcript])

  const handleTranscriptProgress = time => {
    wordsRef.current.map((word, i) => {
      // Word ID attribute
      const wordId = String(word.id)
      // Remove last character from id 's' to get actual second
      const second = Number(wordId.substring(0, wordId.length - 1))
      // Highlight is second s within the bound of currentTime
      if (second < time) {
        // Removed hightlight of previous text
        if (i > 0) {
          wordsRef.current[i - 1].classList.remove('highlight-text')
          dispatch(
            setActiveTranscript('')
          )
        }
        // Highlight recent text
        word.classList.add('highlight-text')

        // Highlight current transcript wrapper
        dispatch(
          setActiveTranscript(
            Number(word.dataset.transcriptIndex)
          )
        )
      }
    })
  }

  const onLoadedData = () => {
    dispatch(
      setAudioProgress({
        from: state.audioProgress.from,
        to: formatTime(audioRef.current.duration)
      })
    )
  }

  const onTimeUpdate = () => {
    handleTranscriptProgress(audioRef.current.currentTime)
    dispatch(
      setAudioProgress({
        from: formatTime(audioRef.current.currentTime),
        to: formatTime(audioRef.current.duration)
      })
    )
  }

  const onEnded = () => {
    dispatch(
      setActiveTranscript('')
    )
    wordsRef.current[wordsRef.current.length - 1].classList.remove('highlight-text')
  }

  const handleAudioToggle = () => {
    if (audioRef.current.paused) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }

  return children({
    state,
    audioRef,
    wordsRef,
    formatTime,
    handleAudioToggle,
    onLoadedData,
    onTimeUpdate,
    onEnded
  })
}

export default Container
