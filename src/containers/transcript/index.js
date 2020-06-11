import React from 'react'
import ComponentContainer from './container'
import AppHeaderComponent from '../../components/AppHeader'
import AudioProgressComponent from '../../components/AudioProgress'
import WaveBarsComponent from '../../components/WaveBars'

export default () => (
  <ComponentContainer>
    {({
      state,
      audioRef,
      wordsRef,
      formatTime,
      handleAudioToggle,
      computeWaveLength,
      computeTotalWavePercentage,
      onLoadedData,
      onTimeUpdate,
      onEnded
    }) => (
      <div>
        {/* HEADER */}
        <AppHeaderComponent
          audioRef={audioRef}
          onLoadedData={onLoadedData}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          handleAudioToggle={handleAudioToggle}
        />

        {/* AUDIO TIME PROGRESS */}
        <AudioProgressComponent
          from={state.audioProgress.from}
          to={state.audioProgress.to}
        />

        {state.transcript && (
          <>
            {/* WAVE BARS */}
            {audioRef.current && !isNaN(audioRef.current.duration) && (
              <WaveBarsComponent
                wordTimings={state.transcript.word_timings}
                computeWaveLength={computeWaveLength}
                computeTotalWavePercentage={computeTotalWavePercentage}
                audioRef={audioRef}
              />
            )}

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
