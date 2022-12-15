// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';
export const EkaratVisualizer = new Visualizer(
  'benztimm-Visualizer',
  (p5: P5, analyzer: Tone.Analyser) => {

    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    p5.push();
    p5.translate(width * .15, height / 2)
    p5.rotate(p5.frameCount);
    draw();
    p5.pop();

    p5.push();
    p5.translate(width * .40, height / 2)
    p5.rotate(p5.frameCount/50);
    draw();
    p5.pop();

    p5.push();
    p5.translate(width * .65, height / 2)
    p5.rotate(p5.frameCount);
    draw();
    p5.pop();


    function draw() {
      const values = analyzer.getValue();
      for (let t = -1; t <= 1; t += 2) {
        p5.beginShape();
        for (let i = 0; i <= 180; i++) {
          let index = p5.floor(p5.map(i, 0, 180, 0, values.length - 1));
          const amplitude = values[index] as number;

          let r = p5.map(amplitude, -1, 1, 25, 200);
          let x = r * (Math.sin(p5.radians(i * Math.pow(2, 3)))) * t;
          let y = r * (Math.cos(p5.radians(i * Math.pow(2, 2))))
          p5.vertex(x, y)
        }
        p5.endShape();
      }
    }

  },

);
