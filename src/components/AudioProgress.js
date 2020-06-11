import React from 'react'
import PropTypes from 'prop-types'

const AudioProgress = ({ from, to }) => (
  <div className='audio-progress'>
    <span className='from'>{from}</span> / {to}
  </div>
)

AudioProgress.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string
}

export default AudioProgress
