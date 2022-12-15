// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';


// project imports
import { Visualizer } from '../Visualizers';

export const YaoVisualizer = new Visualizer(
  'YaoVisualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background('#000000	');

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.fill(0, 0, 255);
    p5.angleMode('degrees');
   

    const values = analyzer.getValue();
    p5.translate(width/2.5,height/2);
    p5.beginShape();
    for (let i = 0; i < values.length; i+=2.5){
      const index = Math.floor(p5.map(i,0,180,0,values.length-1));
      const amplitude = values[index] as number;
      const r = p5.map(amplitude,-1,1,50,250);
      const x = r * Math.sin(i);
      const y = r * Math.cos(i);  
      p5.vertex(x,y);
    }
    p5.endShape();
  },
);

