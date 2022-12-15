// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';

import { GuitarInstrument } from './instruments/benztimm';
import { EkaratVisualizer } from './visualizers/benztimm';

import { ViolinInstrument } from './instruments/MMaksoudian';
import { MMaksoudianVisualizer } from './visualizers/MMaksoudian';

import { CypherkoTaikoDrum } from './instruments/cypherko_inst';
import { Cypherko_viz } from './visualizers/cypherko_viz';

import { DrumInstrument } from './instruments/XiaoqingYao';
import { YaoVisualizer } from './visualizers/YaoVisualizer';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, ViolinInstrument, GuitarInstrument, DrumInstrument, CypherkoTaikoDrum]);

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, MMaksoudianVisualizer, EkaratVisualizer, YaoVisualizer, Cypherko_viz]);


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});