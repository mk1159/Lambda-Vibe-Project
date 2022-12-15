// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const MMaksoudianVisualizer = new Visualizer(
  'MMaksoudian',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = p5.width - 256;
    const height = p5.height;
    const dim = p5.min(width, height);
    const values = analyzer.getValue() as Float32Array;

    p5.rectMode(p5.CENTER);
    p5.angleMode(p5.DEGREES);

    // block time = seconds / 128 samples
    // period = wavelength * block time
    // freq = 1 / period
    // note: 128/(256*0.0026666666666666666) = 187.5 Hz max with 256 samples
    //       128/(512*0.0026666666666666666) = 93.75 Hz max with 512 samples
    const frequency = computeFrequency(analyzer, values);

    let min = 1, max = -1;
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      min = p5.min(min, amplitude);
      max = p5.max(max, amplitude);
    }

    // log2(freq / (C0 Hz))
    const octaveReal = Math.log2(frequency / 16);
    const octave = p5.floor(octaveReal);

    // maps note to integer range [1, 12]
    const note = p5.floor(1 + (12 * octaveReal) % 12);

    let fillColor = NaN, strokeColor = NaN;

    if (octave >= 1 && octave <= 12) {
      fillColor = octaveToColor(octave);

      // octave is valid, note should be too
      if (note >= 1 && note <= 12) {
        strokeColor = noteToColor(note);
      }
    } else if (isNaN(octave)) {
      // errors; white is easy to spot
      fillColor = 0xFFFFFF;
      strokeColor = 0xFFFFFF;
    }

    p5.background(0x11, 0x10, 0);

    // revolutions per second
    const rps = frequency / (60 * 60);
    const deg = 360 * rps * analyzer.now();

    // draw centered rotating square
    p5.push(); {
      p5.noStroke();

      p5.fill(
        (fillColor >> 16) & 0xFF,
        (fillColor >> 8) & 0xFF,
        fillColor & 0xFF
      );

      p5.translate(width / 2, height / 2);
      p5.rotate(-deg);

      const sqrt3Per6 = 0.2886751345;
      const sin60 = 0.866025404;
      const l = 50, h = l * sin60;
      p5.triangle(
        -l/2, l * sqrt3Per6,
        +l/2, l * sqrt3Per6,
        0, -h + l * sqrt3Per6
      );
      p5.beginShape(p5.TRIANGLES);
      p5.endShape(p5.CLOSE);
    }
    p5.pop();

    // draw a bunch of arcs around square
    p5.push(); {
      p5.noFill();
      p5.strokeWeight(dim * 0.005);

      p5.translate(width / 2, height / 2);
      p5.rotate(deg);

      const part = 360 / note; // counts subdivisions of a circle in degrees

      // map amplitude to volume range [1, 20]
      const volume = p5.ceil(p5.map(p5.abs(max) + p5.abs(min), 0, 2, 1, 20, true));

      for (let v = 1; v <= volume; v++) {
        // volume magnitude defines ring diameter.
        // diameter starts on 'third' ring
        const diameter = 2 * height * (v + 3) / (20 + 3);

        p5.stroke(0x11, 0x11, 0x11);
        p5.circle(0, 0, diameter);

        p5.stroke(
          (strokeColor >> 16) & 0xFF,
          (strokeColor >> 8) & 0xFF,
          strokeColor & 0xFF
        );

        // draw the dashed circle, # dashes = note index [1, 12]
        for (let n = 1; n <= note; n++) {
          p5.rotate(part);
          p5.arc(0, 0, diameter, diameter, -15, 0, p5.OPEN);
        }
      }
    }
    p5.pop();

    // p5.stroke(0, 0, 0, 255);
    // p5.fill(255, 255, 255, 255);
    // p5.textSize(15);
    // p5.textAlign(p5.LEFT, p5.CENTER);
    //
    // // truncate to 3 decimals
    // min = p5.ceil(min * 1000) / 1000;
    // max = p5.ceil(max * 1000) / 1000;
    // p5.text(`freq: ${p5.floor(frequency)}  oct: ${octave}  note: ${note}  amp-min: ${min}  amp-max: ${max}  now: ${p5.floor(analyzer.now())}`, 15, height - 15);
  }
);

function octaveToColor(octave: number): number {
  if (octave >= 12) {
    return 0xD2_57_BD;
  } else if (octave >= 11) {
    return 0xF5_60_8F;
  } else if (octave >= 10) {
    return 0xF7_4B_4D;
  } else if (octave >= 9) {
    return 0xFC_72_03;
  } else if (octave >= 8) {
    return 0xFD_B5_08;
  } else if (octave >= 7) {
    return 0xF0_ED_01;
  } else if (octave >= 6) {
    return 0x7E_F0_3F;
  } else if (octave >= 5) {
    return 0x2C_E8_BB;
  } else if (octave >= 4) {
    return 0x41_C8_FB;
  } else if (octave >= 3) {
    return 0x00_8D_FE;
  } else if (octave >= 2) {
    return 0x3E_69_D9;
  } else if (octave >= 1) {
    return 0x81_5D_BD;
  } else {
    return NaN;
  }
}

function noteToColor(note: number): number {
  // just use the inverse
  return octaveToColor(12 - note + 1);
}

function around(value: number, target: number, threshold: number): boolean {
  return value <= target + threshold && value >= target - threshold;
}

function computeFrequency(analyzer: Tone.Analyser, values: Float32Array): number {
  return 128 / (analyzer.blockTime * computeWavelength(values));
}

function computeWavelength(values: Float32Array): number {
  const minLocals: number[] = [];
  const maxLocals: number[] = [];

  let leadingMin = 0, leadingMax = 0,
       secondMin = 0,  secondMax = 0;

  const addMin = (sample: number, amplitude: number) => {
    minLocals.push(sample);

    if ((values[leadingMin] as number) > amplitude) {
      secondMin = leadingMin;
      leadingMin = sample;
    } else if (secondMin === 0) {
      secondMin = sample;
    }
  };

  const addMax = (sample: number, amplitude: number) => {
    maxLocals.push(sample);

    if ((values[leadingMax] as number) < amplitude) {
      secondMax = leadingMax;
      leadingMax = sample;
    } else if (secondMax === 0) {
      secondMax = sample;
    }
  };

  for (let sample = 0; sample < values.length; sample++){
    const amplitude = values[sample] as number;

    if (sample === 0) {
      // on the left edge
      const right = values[sample + 1] as number;

      if (right > amplitude) {
        // increasing
        addMin(sample, amplitude);
      } else if (right < amplitude) {
        // decreasing
        addMax(sample, amplitude);
      }
    } else if (sample === values.length - 1) {
      // on the right edge
      const left = values[sample - 1] as number;

      if (left < amplitude) {
        // increasing
        addMax(sample, amplitude);
      } else if (left > amplitude) {
        // decreasing
        addMin(sample, amplitude);
      }
    } else {
      // somewhere inside the waveform
      const left = values[sample - 1] as number;
      const right = values[sample + 1] as number;

      if ((left < amplitude) && (right < amplitude)) {
        // increasing
        addMax(sample, amplitude);
      } else if ((left > amplitude) && (right > amplitude)) {
        // decreasing
        addMin(sample, amplitude);
      }
    }
  }

  // if (leadingMax - secondMax < leadingMin - secondMin) {
  //   return leadingMin - secondMin;
  // } else {
  //   return leadingMax - secondMax;
  // }

  if (leadingMax - secondMax < leadingMin - secondMin) {
    // min is larger, more likely to be correct?
    // filter out values that are not within 1% of min amp
    const mins = minLocals.filter(v => around(values[leadingMin] as number, values[v] as number, 0.005));

    // in this case, lower troughs are typically the start of a new wave, so only need the first couple of values
    const min1 = mins.pop() as number;
    const min2 = mins.pop() as number;

    return min1 - min2;
  } else {
    // max is larger, more likely to be correct?
    // filter out values that are not within 1% of max amp
    const maxs = maxLocals.filter(v => around(values[leadingMax] as number, values[v] as number, 0.005));

    // in this case, higher peaks are typically the start of a new wave, so only need the first couple of values
    const max1 = maxs.pop() as number;
    const max2 = maxs.pop() as number;

    return max1 - max2;
  }
}
