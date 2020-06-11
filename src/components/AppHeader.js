import React from 'react'
import PropTypes from 'prop-types'
import PauseImage from '../assets/images/pause.png'
import PlayImage from '../assets/images/play.png'
import Share from '../assets/images/share.svg'
import { Button, Badge } from 'react-bootstrap'

const AppHeader = ({ audioRef, onLoadedData, onTimeUpdate, onEnded, handleAudioToggle, handleTranscriptHighlight }) => (
  <div id='header'>
    <audio
      controls
      ref={audioRef}
      onLoadedData={onLoadedData}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
    />
    {audioRef.current && (
      <div className='audio-control'>
        <span className='control-left' onClick={() => handleTranscriptHighlight(audioRef.current.currentTime - 5, true)}>{' '}</span>
        <img
          onClick={handleAudioToggle}
          className='control'
          src={audioRef.current.paused ? PlayImage : PauseImage}
        />
        <span className='control-right' onClick={() => handleTranscriptHighlight(audioRef.current.currentTime + 5, true)}>{' '}</span>
        <select
          className='speed-rate'
          defaultValue='1'
          onChange={e => {
            audioRef.current.playbackRate = Number(e.target.value)
            audioRef.current.play()
          }}
        >
          <option value='0.5'>0.5x</option>
          <option value='0.75'>0.75x</option>
          <option value='1'>1x</option>
          <option value='1.5'>1.5x</option>
          <option value='2'>2x</option>
        </select>
      </div>
    )}
    <Button variant='light' className='share'>
      <img src={Share} /> Share
    </Button>
  </div>
)

AppHeader.propTypes = {
  audioRef: PropTypes.object,
  onLoadedData: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onEnded: PropTypes.func,
  handleAudioToggle: PropTypes.func,
  handleTranscriptHighlight: PropTypes.func
}

export default AppHeader
