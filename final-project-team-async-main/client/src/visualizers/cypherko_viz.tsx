// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

//maurer rose pattern tied to amplitude of song 
export const Cypherko_viz = new Visualizer(
  'Cypherko_viz',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();

    p5.angleMode(p5.DEGREES);

    p5.translate(width / 2, height / 2);
    p5.rotate(analyzer.now() * 30);

    // for (let i = 0; i < 361; i++) {
    //   let k = i * d;
    //   let r = 150 * p5.sin(n * k);

    //   let x = r * p5.cos(k);
    //   let y = r * p5.sin(k);
    //   p5.vertex(x, y);
    // }
    let randomizer1 = Math.floor(Math.random() * 255);
    let randomizer2 = Math.floor(Math.random() * 255);
    let randomizer3 = Math.floor(Math.random() * 255);
    p5.stroke(randomizer1, randomizer2, randomizer3);

    //gif loading
    // let gifload1 = p5.loadImage("client/src/img/kittenvibe.gif");
    // let gifmade1 = p5.createImg("client/src/img/kittenvibe.gif");
    // p5.image(gifload1, width / 2, height / 2);
    // gifmade1.position(width / 2, height / 2);

    p5.beginShape();
    for (let i = 0; i < 360; i++) {
      // const amplitude = values[i] as number;
      // const x = p5.map(i, 0, values.length - 1, 0, width);
      // const y = height / 2 + amplitude * height;
      // // Place vertex
      // p5.vertex(x, y);

      const amplitude = values[i] as number;
      let n = 5;//Math.floor(Math.random() * amplitude / 3); //edit for crazier effects
      let d = Math.floor(Math.random() * amplitude * 71);
      let k = (i) * d;//rose
      let r = 150 * p5.sin(n * k);//rose

      // const x = p5.map(i, 0, values.length - 1, 0, width);
      // const y = height / 2 + amplitude * height;

      let x = r * p5.cos(k);
      let y = r * p5.sin(k);
      // Place vertex
      p5.vertex(x, y);
      p5.pop();
    }
    p5.endShape();
  },
);
