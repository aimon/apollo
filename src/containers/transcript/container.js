import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTranscript, setActiveTranscript, setAudioProgress } from '../../redux/actions'
import { formatTime, truncateLastChar } from '../../helpers'
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
      const second = Number(truncateLastChar(wordId))
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

  const handleTranscriptHighlight = (time, jump = false) => {
    const widthAllowance = 0
    const highlight = document.getElementById('wave-highlight')
    highlight.style.width = ((time / audioRef.current.duration) * (100 + widthAllowance)) + '%'
    if (jump) {
      audioRef.current.currentTime = time
      handleEnd()
      audioRef.current.play()
    }
  }

  const onTimeUpdate = () => {
    handleTranscriptHighlight(audioRef.current.currentTime)
    handleTranscriptProgress(audioRef.current.currentTime)
    dispatch(
      setAudioProgress({
        from: formatTime(audioRef.current.currentTime),
        to: formatTime(audioRef.current.duration)
      })
    )
  }

  const handleEnd = () => {
    dispatch(
      setActiveTranscript('')
    )
    wordsRef.current[wordsRef.current.length - 1].classList.remove('highlight-text')
  }

  const onEnded = () => {
    handleEnd()
  }

  const handleAudioToggle = () => {
    if (audioRef.current.paused) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }

  const computeWaveLength = (from, to) => {
    if (!isNaN(audioRef.current.duration)) {
      return ((to - from) / audioRef.current.duration) * 100
    }
    return 0
  }

  const computeTotalWavePercentage = (wordTimings, isYou = true) => {
    if (!isNaN(audioRef.current.duration)) {
      let totalYou = 0
      wordTimings.map((word, index) => {
        word.map(row => {
          if (index % 2 === 0 && isYou) {
            totalYou += computeWaveLength(
              Number(truncateLastChar(row.startTime)),
              Number(truncateLastChar(row.endTime))
            )
          } else if (index % 2 !== 0 && !isYou) {
            totalYou += computeWaveLength(
              Number(truncateLastChar(row.startTime)),
              Number(truncateLastChar(row.endTime))
            )
          }
        })
      })
      return totalYou.toFixed(2)
    }
  }

  return children({
    state,
    audioRef,
    wordsRef,
    formatTime,
    truncateLastChar,
    handleAudioToggle,
    handleTranscriptHighlight,
    computeWaveLength,
    computeTotalWavePercentage,
    onLoadedData,
    onTimeUpdate,
    onEnded
  })
}

export default Container
