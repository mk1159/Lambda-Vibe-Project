// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { Hertz } from 'tone/build/esm/core/type/Units';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface GuitarKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  single?: boolean; // True if it should contain single dot in guitar fret
  doubledot?: boolean; // True it should contain double dot in guitar fret
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function GuitarKey({
                            note,
                            synth,
                            single,
                            doubledot,
                            index,
                          }: GuitarKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  if (doubledot) {
    return (
      <div
        onMouseDown={() => {
          synth?.triggerAttack(`${note}`)
          console.log(note);
        }}
        onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
        className={classNames('note-fret', {
          'single-fretmark': single,
        })}>
        <div className={classNames({ 'double-fretmark': doubledot })}></div>
      </div>
    );

  }

  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => {
        synth?.triggerAttack(`${note}`)
        console.log(note);
      }} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('note-fret', {
        'single-fretmark': single,
      })}
    ></div>
  );
}

// eslint-disable-next-line
function GuitarKeyWithoutJSX({
                               note,
                               synth,
                               single,
                               index,
                             }: GuitarKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': single,
        'black bg-white h4': !single,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: single ? 1 : 0,
        width: single ? '1.5rem' : '2rem',
        marginLeft: single ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function GuitarType({ title, onClick, active }: any): JSX.Element {
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

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const string1 = List([
    { note: 'E', idx: 0, octave: 4 },
    { note: 'F', idx: 1, octave: 4 },
    { note: 'Gb', idx: 2, octave: 4 },
    { note: 'G', idx: 3, octave: 4 },
    { note: 'Ab', idx: 4, octave: 4 },
    { note: 'A', idx: 5, octave: 4 },
    { note: 'Bb', idx: 6, octave: 4 },
    { note: 'B', idx: 7, octave: 4 },
    { note: 'C', idx: 8, octave: 5 },
    { note: 'Db', idx: 9, octave: 5 },
    { note: 'D', idx: 10, octave: 5 },
    { note: 'Eb', idx: 11, octave: 5 },
    { note: 'E', idx: 12, octave: 5 },
    { note: 'F', idx: 13, octave: 5 },
    { note: 'Gb', idx: 14, octave: 5 },
    { note: 'G', idx: 15, octave: 5 },
    { note: 'Ab', idx: 16, octave: 5 },
    { note: 'A', idx: 17, octave: 5 },
    { note: 'Bb', idx: 18, octave: 5 },
    { note: 'B', idx: 19, octave: 5 },
    { note: 'C', idx: 20, octave: 6 },
    { note: 'Db', idx: 21, octave: 6 },
    { note: 'D', idx: 22, octave: 6 },
    { note: 'Eb', idx: 23, octave: 6 },
    { note: 'E', idx: 24, octave: 6 },

  ]);
  const string2 = List([
    { note: 'B', idx: 0, octave: 3 },
    { note: 'C', idx: 1, octave: 4 },
    { note: 'Db', idx: 2, octave: 4 },
    { note: 'D', idx: 3, octave: 4 },
    { note: 'Eb', idx: 4, octave: 4 },
    { note: 'E', idx: 5, octave: 4 },
    { note: 'F', idx: 6, octave: 4 },
    { note: 'Gb', idx: 7, octave: 4 },
    { note: 'G', idx: 8, octave: 4 },
    { note: 'Ab', idx: 9, octave: 4 },
    { note: 'A', idx: 10, octave: 4 },
    { note: 'Bb', idx: 11, octave: 4 },
    { note: 'B', idx: 12, octave: 4 },
    { note: 'C', idx: 13, octave: 5 },
    { note: 'Db', idx: 14, octave: 5 },
    { note: 'D', idx: 15, octave: 5 },
    { note: 'Eb', idx: 16, octave: 5 },
    { note: 'E', idx: 17, octave: 5 },
    { note: 'F', idx: 18, octave: 5 },
    { note: 'Gb', idx: 19, octave: 5 },
    { note: 'G', idx: 20, octave: 5 },
    { note: 'Ab', idx: 21, octave: 5 },
    { note: 'A', idx: 22, octave: 5 },
    { note: 'Bb', idx: 23, octave: 5 },
    { note: 'B', idx: 24, octave: 5 },
  ]);
  const string3 = List([
    { note: 'G', idx: 0, octave: 3 },
    { note: 'Ab', idx: 1, octave: 3 },
    { note: 'A', idx: 2, octave: 3 },
    { note: 'Bb', idx: 3, octave: 3 },
    { note: 'B', idx: 4, octave: 3 },
    { note: 'C', idx: 5, octave: 4 },
    { note: 'Db', idx: 6, octave: 4 },
    { note: 'D', idx: 7, octave: 4 },
    { note: 'Eb', idx: 8, octave: 4 },
    { note: 'E', idx: 9, octave: 4 },
    { note: 'F', idx: 10, octave: 4 },
    { note: 'Gb', idx: 11, octave: 4 },
    { note: 'G', idx: 12, octave: 4 },
    { note: 'Ab', idx: 13, octave: 4 },
    { note: 'A', idx: 14, octave: 4 },
    { note: 'Bb', idx: 15, octave: 4 },
    { note: 'B', idx: 16, octave: 4 },
    { note: 'C', idx: 17, octave: 5 },
    { note: 'Db', idx: 18, octave: 5 },
    { note: 'D', idx: 19, octave: 5 },
    { note: 'Eb', idx: 20, octave: 5 },
    { note: 'E', idx: 21, octave: 5 },
    { note: 'F', idx: 22, octave: 5 },
    { note: 'Gb', idx: 23, octave: 5 },
    { note: 'G', idx: 24, octave: 5 },
  ]);

  const string4 = List([
    { note: 'D', idx: 0, octave: 3 },
    { note: 'Eb', idx: 1, octave: 3 },
    { note: 'E', idx: 2, octave: 3 },
    { note: 'F', idx: 3, octave: 3 },
    { note: 'Gb', idx: 4, octave: 3 },
    { note: 'G', idx: 5, octave: 3 },
    { note: 'Ab', idx: 6, octave: 3 },
    { note: 'A', idx: 7, octave: 3 },
    { note: 'Bb', idx: 8, octave: 3 },
    { note: 'B', idx: 9, octave: 3 },
    { note: 'C', idx: 10, octave: 4 },
    { note: 'Db', idx: 11, octave: 4 },
    { note: 'D', idx: 12, octave: 4 },
    { note: 'Eb', idx: 13, octave: 4 },
    { note: 'E', idx: 14, octave: 4 },
    { note: 'F', idx: 15, octave: 4 },
    { note: 'Gb', idx: 16, octave: 4 },
    { note: 'G', idx: 17, octave: 4 },
    { note: 'Ab', idx: 18, octave: 4 },
    { note: 'A', idx: 19, octave: 4 },
    { note: 'Bb', idx: 20, octave: 4 },
    { note: 'B', idx: 21, octave: 4 },
    { note: 'C', idx: 22, octave: 5 },
    { note: 'Db', idx: 23, octave: 5 },
    { note: 'D', idx: 24, octave: 5 },
  ]);
  const string5 = List([
    { note: 'A', idx: 0, octave: 2 },
    { note: 'Bb', idx: 1, octave: 2 },
    { note: 'B', idx: 2, octave: 2 },
    { note: 'C', idx: 3, octave: 3 },
    { note: 'Db', idx: 4, octave: 3 },
    { note: 'D', idx: 5, octave: 3 },
    { note: 'Eb', idx: 6, octave: 3 },
    { note: 'E', idx: 7, octave: 3 },
    { note: 'F', idx: 8, octave: 3 },
    { note: 'Gb', idx: 9, octave: 3 },
    { note: 'G', idx: 10, octave: 3 },
    { note: 'Ab', idx: 11, octave: 3 },
    { note: 'A', idx: 12, octave: 3 },
    { note: 'Bb', idx: 13, octave: 3 },
    { note: 'B', idx: 14, octave: 3 },
    { note: 'C', idx: 15, octave: 4 },
    { note: 'Db', idx: 16, octave: 4 },
    { note: 'D', idx: 17, octave: 4 },
    { note: 'Eb', idx: 18, octave: 4 },
    { note: 'E', idx: 19, octave: 4 },
    { note: 'F', idx: 20, octave: 4 },
    { note: 'Gb', idx: 21, octave: 4 },
    { note: 'G', idx: 22, octave: 4 },
    { note: 'Ab', idx: 23, octave: 4 },
    { note: 'A', idx: 24, octave: 4 },
  ]);
  const string6 = List([
    { note: 'E', idx: 0, octave: 2 },
    { note: 'F', idx: 1, octave: 2 },
    { note: 'Gb', idx: 2, octave: 2 },
    { note: 'G', idx: 3, octave: 2 },
    { note: 'Ab', idx: 4, octave: 2 },
    { note: 'A', idx: 5, octave: 2 },
    { note: 'Bb', idx: 6, octave: 2 },
    { note: 'B', idx: 7, octave: 2 },
    { note: 'C', idx: 8, octave: 3 },
    { note: 'Db', idx: 9, octave: 3 },
    { note: 'D', idx: 10, octave: 3 },
    { note: 'Eb', idx: 11, octave: 3 },
    { note: 'E', idx: 12, octave: 3 },
    { note: 'F', idx: 13, octave: 3 },
    { note: 'Gb', idx: 14, octave: 3 },
    { note: 'G', idx: 15, octave: 3 },
    { note: 'Ab', idx: 16, octave: 3 },
    { note: 'A', idx: 17, octave: 3 },
    { note: 'Bb', idx: 18, octave: 3 },
    { note: 'B', idx: 19, octave: 3 },
    { note: 'C', idx: 20, octave: 4 },
    { note: 'Db', idx: 21, octave: 4 },
    { note: 'D', idx: 22, octave: 4 },
    { note: 'Eb', idx: 23, octave: 4 },
    { note: 'E', idx: 24, octave: 4 },
  ]);


  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();
      if (newType === 'custom') {
        const synth = new Tone.Synth({
          oscillator: {
            type: 'custom',
            partials: [
              1,
              -0.7060667438271604,
              0.4822530864197532,
              -0.25173912519290115,
              0.19753086419753096,
              -0.0860851900077161,
              0.0625,
              -0.030140817901234556,
              0.019775390625,
              -0.012345679012345685,
              0.007236810378086416,
              -0.00390625,
              0.0007716049382716042
            ],
          },
          envelope: {
            attack: 0.2,
            attackCurve: "exponential",
            decay: 1,
            decayCurve: "exponential",
            release: 1,
            releaseCurve: "exponential",
            sustain: 0.2
          }
        });

        const reverb = new Tone.Reverb({
          decay: 0.3,
          preDelay: 0.3,
        });
        const subtleVibrato = new Tone.Vibrato({
          maxDelay: 0.3,
          frequency: 84 as Hertz,
          depth: 0
        });
        synth.connect(reverb);
        synth.connect(subtleVibrato);
        return synth.toDestination();;
      } else {
        return new Tone.Synth({
          oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        }).toDestination();
      }
    });
  };

  const oscillators: List<OscillatorType> = List([
    'custom',
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

  const singleFretMarkPos = [3, 5, 7, 9, 15, 19, 21];
  const doubleFretMartPos = [12, 24];


  return (
    <div className="pv4">
      <div className="fretboard">
        <div className="string">
          {string1.map(string1 => {
            const isSingle = singleFretMarkPos.includes(string1.idx);
            const isDouble = doubleFretMartPos.includes(string1.idx);
            const note = `${string1.note}${string1.octave}`;
            return (
              <GuitarKey
                key={note}
                note={note}
                synth={synth}
                single={isSingle}
                doubledot={isDouble}
                octave={string1.octave}
                index={string1.idx}
              />
            );
          })}
        </div>
        <div className="string">
          {string2.map(string2 => {
            const note = `${string2.note}${string2.octave}`;
            return (
              <GuitarKey
                key={note}
                note={note}
                synth={synth}
                octave={string2.octave}
                index={string2.idx}
              />
            );
          })}
        </div>
        <div className="string">
          {string3.map(string2 => {
            const note = `${string2.note}${string2.octave}`;
            return (
              <GuitarKey
                key={note}
                note={note}
                synth={synth}
                octave={string2.octave}
                index={string2.idx}
              />
            );
          })}
        </div>

        <div className="string">
          {string4.map(string2 => {
            const note = `${string2.note}${string2.octave}`;
            return (
              <GuitarKey
                key={note}
                note={note}
                synth={synth}
                octave={string2.octave}
                index={string2.idx}
              />
            );
          })}
        </div>

        <div className="string">
          {string5.map(string2 => {
            const note = `${string2.note}${string2.octave}`;
            return (
              <GuitarKey
                key={note}
                note={note}
                synth={synth}
                octave={string2.octave}
                index={string2.idx}
              />
            );
          })}
        </div>


        <div className="string">
          {string6.map(string2 => {
            const note = `${string2.note}${string2.octave}`;
            return (
              <GuitarKey
                key={note}
                note={note}
                synth={synth}
                octave={string2.octave}
                index={string2.idx}
              />
            );
          })}
        </div>
      </div>


      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <GuitarType
            key={o}
            title={o === 'custom' ? 'Guitar' : o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const GuitarInstrument = new Instrument('benztimm-Guitar', Guitar);
