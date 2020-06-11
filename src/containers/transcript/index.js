import * as React from 'react'
import ComponentContainer from './container'
import PauseImage from '../../assets/images/pause.png'
import PlayImage from '../../assets/images/play.png'
import RotateLeft from '../../assets/images/rotate-left.svg'
import RotateRight from '../../assets/images/rotate-right.svg'

export default () => (
  <ComponentContainer>
    {({ state, audioRef, wordsRef, handleAudioToggle, onTimeUpdate, onEnded }) => (
      <div>
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
            </div>
          )}
        </div>
        <div className='audio-progress'>
          <span className='from'>{state.audioProgress.from}</span> / {state.audioProgress.to}
        </div>
        {state.transcript && (
          <>
            {state.transcript.word_timings.map((word, index) => (
              <div
                key={index}
                className={`transcript ${index % 2 !== 0 && 'indent'} ${state.activeTranscript === index && 'highlight'}`}
              >
                <div className='time'>
                  03:25
                </div>
                <div className='script'>
                  {word.map((row, wordIndex) => (
                    <span key={JSON.stringify(row)}>
                      <span

                        id={row.startTime}
                        data-transcript-index={index}
                        ref={el => {
                          wordsRef.current[
                            wordIndex + (
                              typeof state.transcript.word_timings[index - 1] !== 'undefined'
                                ? state.transcript.word_timings[index - 1].length
                                : 0
                            )] = el
                          return el
                        }}
                      >
                        {row.word}
                      </span>
                      {' '}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    )}
  </ComponentContainer>
)
