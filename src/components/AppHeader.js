import React from 'react'
import PropTypes from 'prop-types'
import PauseImage from '../assets/images/pause.png'
import PlayImage from '../assets/images/play.png'
import RotateLeft from '../assets/images/rotate-left.svg'
import RotateRight from '../assets/images/rotate-right.svg'
import Share from '../assets/images/share.svg'
import { Button, Badge } from 'react-bootstrap'

const AppHeader = ({ audioRef, onTimeUpdate, onEnded, handleAudioToggle }) => (
  <div id='header'>
    <audio
      controls
      ref={audioRef}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
    />
    {audioRef.current && (
      <div className='audio-control'>
        <img src={RotateLeft} className='control-left' />
        <img
          onClick={handleAudioToggle}
          className='control'
          src={audioRef.current.paused ? PlayImage : PauseImage}
        />
        <img src={RotateRight} className='control-right' />

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
  onTimeUpdate: PropTypes.func,
  onEnded: PropTypes.func,
  handleAudioToggle: PropTypes.func
}

export default AppHeader
