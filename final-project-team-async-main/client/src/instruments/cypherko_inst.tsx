// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useEffect } from 'react';
import drumImage from '../img/taiko.png';
import taikoStick from '../img/taikoStick2.png';
import japaneseBackground from '../img/japaneseWallpaper.jpeg';
// import japaneseBackground2 from '../img/japaneseWallpaper2.jpeg';
// import japaneseBackground3 from '../img/japaneseWallpaper3.jpeg';
// import japaneseBackground4 from '../img/japaneseWallpaper4.jpeg';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

// const backgroundImgArray = [japaneseBackground, japaneseBackground2, japaneseBackground3, japaneseBackground4];
// const randomImg = Math.floor(Math.random() * backgroundImgArray.length);
// const selectedPicture = backgroundImgArray[randomImg];
/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface PianoKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function PianoKey({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor, // minor keys are black
        'black bg-white h4': !minor, // major keys are white
      })}


      style={{
        //CSS
        // top: 0,
        // left: `${index * 2}rem`,
        // zIndex: minor ? 1 : 0,
        // width: minor ? '1.5rem' : '2rem',
        // marginLeft: minor ? '0.25rem' : 0,
        cursor: `url(${taikoStick}),auto`,
        background: `url(${drumImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        borderRadius: '50%',
        height: '200px',
        width: '200px',
        position: 'absolute',
        //boxShadow: '0 0 0 20px #c2a97d',
        //margin: 'auto',
        //marginTop: '3%',
        //marginBottom: '5%',
        zIndex: 1,
        right: '50%',
        left: '50%',
        top: '5%',
        bottom: '5%',
        //inset: '-118 % 27 % 9 % 47 %',

      }}
    ></div >

  );
}

export function TaikoOuterEdge({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor, // minor keys are black
        'black bg-white h4': !minor, // major keys are white
      })}


      style={{
        //CSS
        //top: 0,
        // left: `${index * 2}rem`,
        // zIndex: minor ? 1 : 0,
        // width: minor ? '1.5rem' : '2rem',
        // marginLeft: minor ? '0.25rem' : 0,
        // color: 'red',
        cursor: `url(${taikoStick}),auto`,
        background: `brown`,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        borderRadius: '50%',
        height: '250px',
        width: '250px',
        position: 'absolute',
        //inset: '-118 % 27 % 9 % 47 %',
        //boxShadow: '0 0 0 20px #c2a97d',
        //margin: 'auto',
        // marginTop: '3%',
        // marginBottom: '5%',

        right: '47%',
        left: '47%',
        top: '-2%',
        bottom: '-2%',
      }}
    ></div >

  );
}



// eslint-disable-next-line
function PianoKeyWithoutJSX({
  note,
  synth,
  minor,
  index,
}: PianoKeyProps): JSX.Element {
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
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

function PianoType({ title, onClick, active }: any): JSX.Element {
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

function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    //{ note: 'Db', idx: 0.5 },
    //{ note: 'D', idx: 1 },
    // { note: 'Eb', idx: 1.5 },
    // { note: 'E', idx: 2 },
    // { note: 'F', idx: 3 },
    // { note: 'Gb', idx: 3.5 },
    // { note: 'G', idx: 4 },
    // { note: 'Ab', idx: 4.5 },
    // { note: 'A', idx: 5 },
    // { note: 'Bb', idx: 5.5 },
    //{ note: 'B', idx: 6 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    // 'sine',
    // 'sawtooth',
    // 'square',
    // 'triangle',
    // 'fmsine',
    // 'fmsawtooth',
    // 'fmtriangle',
    // 'amsine',
    // 'amsawtooth',
    // 'amtriangle',
  ]) as List<OscillatorType>;

  useEffect(() => {
    setOscillator('triangle');
  }, [])

  return (
    <div className="pv4" style={{ backgroundImage: `url(${japaneseBackground})` }}>
      <div className="dib h4 w-100 ml4">
        {Range(2, 3).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${'C'}${octave}`;
            return (
              <PianoKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />


            );
          }),
        )}

      </div>
      <div className="dib h4 w-100 ml4">
        {Range(2, 3).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${'F'}${octave}`;
            return (
              <TaikoOuterEdge
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />

            );
          }),
        )}
      </div>
    </div>
  );
}

export const CypherkoTaikoDrum = new Instrument('Cypherko_Taiko', Piano);