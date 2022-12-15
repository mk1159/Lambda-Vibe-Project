// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import {Instrument,  InstrumentProps } from '../Instruments';


/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Drum.
 ** ------------------------------------------------------------------------ */

interface DrumKeyProps {
  note: string; 
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  octave: number;
  index: number; // octave + index together give a location for the Drum key
}

export function DrumKey({
  note,
  synth,
  index,
  
}: DrumKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the Drum.
   * See `DrumKeyWithoutJSX` for the React component without JSX.
   */
 
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer relate drum top', {
      })}
      style={{
        // CSS
        backgroundColor: "	#0000FF",
        display: "inline-block",
        borderRadius: "100%",
        width: 100,
        height: 100,
        marginLeft: (index)+10,
        marginRight: 5-(index),
      }}
    ></div>
  );
}



function DrumType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Drum({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'A0', idx: 0 },
    { note: 'B0', idx: 1 },
    { note: 'G2', idx: 2 },
    { note: 'A2', idx: 3 },
    { note: 'B2', idx: 4 },
    { note: 'C2', idx: 5 },
    { note: 'D2', idx: 6 },
    { note: 'E2', idx: 7 },
    { note: 'F2', idx: 8 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        "envelope": {
          "attack": 0.001,
          "decay": 0.1,
          "sustain": 0.05,
          "release": 1,
        },
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {keys.map(key => {
            const note = `${key.note}`;
            return (
              <DrumKey
                key={note} //react key
                note={note}
                synth={synth}
                octave={0}
                index={key.idx}
              />
            );
          },
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <DrumType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const DrumInstrument = new Instrument('Drum', Drum);
