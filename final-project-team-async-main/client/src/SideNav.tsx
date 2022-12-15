// 3rd party library imports
import classNames from 'classnames';
import { List } from 'immutable';
import React, { useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';
import { read } from "midifile-ts";

/** ------------------------------------------------------------------------ **
 * SideNav component
 ** ------------------------------------------------------------------------ */

type SideNavProps = {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
};

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  /**
   * 
   * SideNav
   * |-----------------|
   * | Nameless App    |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * | InstrumentsNav  |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   | 
   * |                 |
   * | VisualizersNav  |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * | SongsNav        |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * |-----------------|
  */

  return (
    <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
      <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
        Team Async
      </div>
      <div className="flex-auto">
        <InstrumentsNav state={state} dispatch={dispatch} />
        <VisualizersNav state={state} dispatch={dispatch} />
        <SongsNav state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}


/** ------------------------------------------------------------------------ **
 * SideNav Sub-Components
 ** ------------------------------------------------------------------------ */

 function InstrumentsNav({ state }: SideNavProps): JSX.Element {
  /** 
   *  InstrumentsNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| | 
   *  | | RadioButton | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
  */
  
  const instruments: List<Instrument> = state.get('instruments');
  const activeInstrument = state.get('instrument')?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map(i => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function VisualizersNav({ state }: SideNavProps): JSX.Element {
  /** 
   *  VisualizersNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| | 
   *  | | RadioButton | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
  */

  const visualizers: List<Visualizer> = state.get('visualizers');
  const activeVisualizer = state.get('visualizer')?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map(v => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

function SongsNav({ state, dispatch }: SideNavProps): JSX.Element {
  /**
   *
   *  SongsNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | Music20     | |
   *  | |-------------| |
   *  | | Music20     | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
   */

  const songs: List<any> = state.get('songs', List());
  const [query, setQuery] = useState("")
  const inputFile = useRef<HTMLInputElement>(null);

  return (
    <Section title="Playlist" controls={
      <div>

        <input
          className='mb2'
          placeholder="Search: "
          onChange={event => setQuery(event.target.value)}/>

        <div className='mb2'>
          <input type='file' id='file' ref={inputFile} onChange={
            async (event) => {
              event.preventDefault();

              const input: HTMLInputElement = event.target;

              if (input.files === null || input.files.length === 0) {
                return
              }

              const file = input.files[0]
              const reader = new FileReader()

              reader.onload = async e => {
                if (e.target == null) {
                  return
                }

                const buf = e.target.result as ArrayBuffer
                const midi = read(buf)

                const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']; // sharp
                const songNotes: string[] = [];

                for (const track of midi.tracks) {
                  // console.log(midi.tracks);

                  for (const event of track) {
                    // console.log(event);
                    if (event.type === 'channel' && event.subtype === 'noteOn') {
                      /*
                       * midi octave starts at -1
                       *   https://www.music.mcgill.ca/~ich/classes/mumt306/StandardMIDIfileformat.html#BMA1_3
                       */
                      const octave = 1 + Math.floor(event.noteNumber / 12);
                      const note = Math.floor(event.noteNumber % 12);
                      // console.log(`${notes[note]}${octave}`);
                      songNotes.push(`${notes[note]}${octave}`);
                    }
                  }
                }

                if (songNotes.length !== 0) {
                  dispatch(new DispatchAction('ADD_SONGS', {
                    'new_song': {
                      title: file.name,
                      notes: songNotes.join(' ')
                    }
                  }));
                }
              }

              reader.readAsArrayBuffer(file);
            }} style={{ display: 'none' }}/>
          <button onClick={() => {
            if (inputFile.current) {
              inputFile.current.click();
            }
          }}>Upload midi file</button>
        </div>
      </div>
    }>
      {songs.filter(song => song.get('songTitle').toLowerCase().includes(query.toLowerCase())).map(song => (
        <div
          key={song.get('id')}
          className="f6 pointer underline flex items-center no-underline i dim mb1"
          onClick={() =>
            dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
          }
        >
          <Music20 className="mr1" />
          {song.get('songTitle')}
        </div>
      ))}
    </Section>
  );
}


/** ------------------------------------------------------------------------ **
 * Auxilliary components
 ** ------------------------------------------------------------------------ */

/** ------------------------------------- **
 * Radio Button
 ** ------------------------------------- */

 type RadioButtonProps = {
  to: any,
  text: string,
  active: boolean,
  onClick: () => void
};

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames('f6 flex items-center black', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim">{text}</div>
      </div>
    </Link>
  );
}


/** ------------------------------------- **
 * Section
 ** ------------------------------------- */

const Section: React.FC<{ title: string, controls?: any }> = ({ title, controls, children }) => {
  return (
    <div className="flex flex-column h-25 bb b--light-gray pa3">
      <div className="fw7 mb2">{title} </div>
      <div className='mv2'>{controls}</div>
      <div className="flex-auto overflow-scroll">{children}</div>
    </div>
  );
};
