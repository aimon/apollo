import React from 'react'
import PropTypes from 'prop-types'
import PauseImage from '../assets/images/pause.png'
import PlayImage from '../assets/images/play.png'
import Share from '../assets/images/share.svg'
import { Button, Badge } from 'react-bootstrap'

const AppHeader = ({ audioRef, onLoadedData, onTimeUpdate, onEnded, handleAudioToggle }) => (
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
        <span className='control-left'>{' '}</span>
        <img
          onClick={handleAudioToggle}
          className='control'
          src={audioRef.current.paused ? PlayImage : PauseImage}
        />
        <span className='control-right'>{' '}</span>
        <Badge variant='light' className='playback-rate'>1.0x</Badge>
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
  handleAudioToggle: PropTypes.func
}

export default AppHeader
