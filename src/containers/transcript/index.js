import React from 'react'
import ComponentContainer from './container'
import AppHeaderComponent from '../../components/AppHeader'
import AudioProgressComponent from '../../components/AudioProgress'

export default () => (
  <ComponentContainer>
    {({ state, audioRef, wordsRef, formatTime, handleAudioToggle, onTimeUpdate, onEnded }) => (
      <div>
        <AppHeaderComponent
          audioRef={audioRef}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          handleAudioToggle={handleAudioToggle}
        />
        <AudioProgressComponent
          from={state.audioProgress.from}
          to={state.audioProgress.to}
        />
        {state.transcript && (
          <>
            {state.transcript.word_timings.map((word, index) => (
              <div
                key={index}
                className={`transcript ${index % 2 !== 0 && 'indent'} ${state.activeTranscript === index && 'highlight'}`}
              >
                <div className='time'>
                  {formatTime(Number(word[0].startTime.substring(0, word[0].startTime.length - 1)))}
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
