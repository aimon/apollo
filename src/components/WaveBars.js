import React from 'react'
import PropTypes from 'prop-types'
import { truncateLastChar } from '../helpers'
import { Row, Col } from 'react-bootstrap'

const WaveBars = ({ wordTimings, computeWaveLength, computeTotalWavePercentage, audioRef }) => (
  <div id='wave-bars'>
    <Row>
      <Col xs={1} style={{ width: 100 }}>
        <span className='you-percentage'>{computeTotalWavePercentage(wordTimings)}%</span>
        <span className='you-name'>YOU</span>
      </Col>
      <Col xs={11}>
        <div className='your-wave'>
          {[...Array(Math.round(audioRef.current.duration))].map((_, time) => (
            <span
              key={time}
              className={`wave-bar
            ${wordTimings.filter((word, index) => {
              return word.filter(row => {
                const start = Number(truncateLastChar(row.startTime))
                const end = Number(truncateLastChar(row.endTime))
                return time >= start && time <= end && index % 2 === 0
              }).length > 0
            }).length > 0
            ? 'with-voice'
            : ''}
          `}
              style={{
                width: ((1 / audioRef.current.duration) * 100) + '%'
              }}
            />
          ))}
        </div>
      </Col>
    </Row>
    <div className='divider' />
    <Row>
      <Col xs={1} style={{ width: 100 }}>
        <span className='prospect-percentage'>{computeTotalWavePercentage(wordTimings, false)}%</span>
        <span className='prospect-name'>PROSPECT</span>
      </Col>
      <Col xs={11}>
        <div className='prospect-wave'>
          {[...Array(Math.round(audioRef.current.duration))].map((_, time) => (
            <span
              key={time}
              className={`wave-bar
            ${wordTimings.filter((word, index) => {
              return word.filter(row => {
                const start = Number(truncateLastChar(row.startTime))
                const end = Number(truncateLastChar(row.endTime))
                return time >= start && time <= end && index % 2 !== 0
              }).length > 0
            }).length > 0
            ? 'with-voice'
            : ''}
          `}
              style={{
                width: ((1 / audioRef.current.duration) * 100) + '%'
              }}
            />
          ))}
        </div>
      </Col>
    </Row>
  </div>
)

WaveBars.propTypes = {
  wordTimings: PropTypes.array,
  computeWaveLength: PropTypes.func,
  computeTotalWavePercentage: PropTypes.func,
  audioRef: PropTypes.object
}

export default WaveBars
