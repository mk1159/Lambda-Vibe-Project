// 3rd party library imports
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import * as Tone from 'tone';
import { Hertz } from 'tone/build/esm/core/type/Units';
import { Range } from 'immutable';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';


function ViolinNode({ synth, octave, note }: any): JSX.Element {
  return <div className='hide-child ph2'>
    <div className='glow child pointer ph1 fw7 tc-l light-silver'
      style={{
        width: '2.5rem',
        height: '2.5rem',
        textAlign: 'center',
        borderRadius: '50%',
        lineHeight: '2.5rem',
        textShadow: '1px 1px 1px black',
        boxShadow: '0 0 8px #333',
        userSelect: 'none',
        background: 'linear-gradient(#a463f2, #5e2ca5)'
      }}
      onMouseDown={() => synth?.triggerAttack(`${note}${octave}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      onMouseOut={() => synth?.triggerRelease('+0.25')}
    >
      {`${octave}${note}`}
    </div>
  </div>;
}

function ViolinString({ synth, startOctave, startNote }: any): JSX.Element {
  // const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']; // flat
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']; // sharp
  const noteIndex = notes.indexOf(startNote);

  function octave(node: number): number {
    // increases an octave every 12 notes
    return startOctave + Math.floor((noteIndex + node) / 12);
  }

  function note(node: number): string {
    // loop back to 'C' once next octave is reached
    return notes[(noteIndex + node) % 12];
  }

  /* note and octave order from https://144notes.org/# */
  return <div className='flex justify-center flex-column'>
    <div
      className='w-100 absolute z-1'
      style={{
        height: '5px',
        background: 'linear-gradient(#999, #555)',
        boxShadow: '0 3px 10px black',
      }}/>
    <div className='w-100 h-100 flex ph2 z-3'>
      {Range(0, 22).map(node => {
          const nodeOctave = octave(node);
          const nodeNote = note(node);

          return <ViolinNode
            key={`${startOctave}-${nodeOctave}${nodeNote}`}
            synth={synth}
            octave={nodeOctave}
            note={nodeNote}
          />
        }
      )}
    </div>
  </div>;
}

function Violin({ synth, setSynth }: InstrumentProps): JSX.Element {
  const [toggleVibrato, setVibrato] = useState<boolean>(false);

  useEffect(() => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      const violinSynth = new Tone.Synth({
        oscillator: {
          type: 'custom',

          /* Spectrum of violin G5 note: https://www.tremblingsandwarblings.com/wp-content/uploads/2017/04/violin.png */
          partials: [
            19 / 19, // fundamental
            17.5 / 19,
            13.1 / 19,
            11.9 / 19,
            12.1 / 19,
            8.3 / 19,
            9.8 / 19,
            8.1 / 19,
            6.5 / 19,
            3.1 / 19,
            4.8 / 19,
            4.0 / 19,
            4.2 / 19,
            3.2 / 19,
            4.0 / 19,
            1.1 / 19,
            2.2 / 19,
            3.2 / 19,
            0.5 / 19,
            3.7 / 19,
            1.6 / 19,
          ]
        },

        /* https://www.researchgate.net/figure/Bernardini-violin-2006-open-strings-ADSR-envelopes-for-fundamental-notes-of-196-Hz_fig2_325839783 */
        envelope: {
          attack: 0.15,
          decay: 0.10,
          sustain: 0.70,
          release: 0.80
        }
      });

      const vibrato: Tone.Vibrato = (() => {
        if (toggleVibrato) {
          /*
           * https://www.ideals.illinois.edu/bitstream/handle/2142/104007/ECE499-Sp2019-ding.pdf
           * "Typically, the vibrato rate for a bowed string is between 5 and 7 Hz. The vibrato
           *  amplitude (depth) for a string instrument is generally less than 2%"
           */
          return new Tone.Vibrato({
            maxDelay: 0.002,
            frequency: 6 as Hertz,
            depth: 0.13
          });
        } else {
          /*
           * Add a subtle vibrato to modulate the frequency a bit
           */
          return new Tone.Vibrato({
            maxDelay: 0.002,
            frequency: 1.5 as Hertz,
            depth: 0.05
          });
        }
      })();

      /*
       * Use some reverb to layer the sound
       */
      const reverb = new Tone.Reverb({
        decay: 0.4,
        preDelay: 0.03,
      });

      violinSynth.connect(vibrato);
      vibrato.connect(reverb);

      // too quiet, make it louder
      const gain = new Tone.Gain(5);
      reverb.connect(gain);

      gain.toDestination();
      return violinSynth;
    });
  }, [setSynth, toggleVibrato]);

  return <div className='ph3 pv3'>
    <div
      className='pv3 dib relative'
      style={{
        clipPath: `polygon(0% 93%, 0% 7%, 100% 0%, 100% 100%)`,
        background: 'linear-gradient(#333, #111)'
      }}
    >
      <div className='flex justify-between'>
        <div
          className='h-100 absolute z-2'
          style={{
            top: 0,
            left: 0,
            marginLeft: 0,
            marginRight: 'auto',
            width: '15px',
            boxShadow: '3px 0 4px #111',
            background: 'linear-gradient(180deg, #333, #111)'
          }}/>
        <div
          className='h-100 absolute z-2'
          style={{
            top: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 0,
            width: '15px',
            boxShadow: '-3px 0 4px #111',
            background: 'linear-gradient(180deg, #333, #111)'
          }}/>
      </div>
      <ViolinString
        synth={synth}
        startOctave={5}
        startNote={'E'}
      />
      <ViolinString
        synth={synth}
        startOctave={4}
        startNote={'A'}
      />
      <ViolinString
        synth={synth}
        startOctave={4}
        startNote={'D'}
      />
      <ViolinString
        synth={synth}
        startOctave={3}
        startNote={'G'}
      />
    </div>
    <div className={'ph4 pt2 flex'}>
      <div
        onClick={() => setVibrato(was => !was)}
        className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
          'b--black black': toggleVibrato,
          'gray b--light-gray': !toggleVibrato,
        })}>
        {'Vibrato'}
      </div>
    </div>
  </div>;
}

export const ViolinInstrument = new Instrument('MMaksoudian-Violin', Violin);
