import { view } from '../View/index.js';
import { waves } from '../Waves/index.js';
//import { Point } from './Point';
import { CANVAS_HEIGHT, CANVAS_WIDTH, X_AXIS_START_POSITION } from "../consts/canvas-consts";

export default class Wave {
    constructor() {
        this._w = CANVAS_WIDTH;
        this._h = CANVAS_HEIGHT;
        window.requestAnimationFrame(this.animate)
        // setInterval(() => {
        //     this.animate()
        // }, 1000);
        this.setWave()
        view.onButtonClick(this.setAmplitude);
    }

    setAmplitude = (amp) => {
        const wave = waves.getWaves()[0];
        wave.maxAmlitude = +amp
    }

    setWave = () => {
        const x = 1000
        const maxAmlitude = 1;
        const angleSpeed = 10
        const f = 1;

        waves.addWave({
            x, 
            maxAmlitude: maxAmlitude * this._h/4,
            angleSpeed,
            f,
            r:1,
            t: 0,
        });

    }

    animate = () => {
        
        const arr = waves.getWaves();
        const last = arr[arr.length - 1];
        //console.log(arr);
        
        this.waveMove(last);

        arr.forEach((wave) => {
           
            const coords = {
                prevX: wave.prevX,
                x: wave.x,
                phasorX: wave.phasorX,
                phasorY: wave.phasorY,
                prevY: wave.prevAmp,
                y: wave.amplitude,
                r: wave.r,
                maxAmplitude: wave.maxAmlitude,
            }        
            //console.log(coords);
            
            view.waveCanvas.draw(coords);
        });
        //view.waveCanvas.draw(arr);
        window.requestAnimationFrame(this.animate)
    }
    
    waveMove = (wave) => {
        wave.prevAmp = wave.amplitude;
        //console.log(waves.getWaves());
        
        wave.prevX = wave.x;
        wave.prevPhasorX = wave.phasorX;

        const f = wave.f/(this._w/2)
        const r = wave.maxAmlitude;
        const angleSpeed = 2 * Math.PI * f;

        wave.amplitude = this._h/2 - wave.maxAmlitude * Math.sin(angleSpeed * wave.t)
        wave.phasorX = this._h/2 - wave.maxAmlitude * Math.cos(angleSpeed * wave.t) - 150
        wave.x = wave.t + X_AXIS_START_POSITION;

        wave.t += 1

        // const coords = {
        //     prevX: wave.prevX,
        //     x: wave.x,
        //     phasorX: wave.phasorX,
        //     phasorY: wave.phasorY,
        //     prevY: wave.prevAmp,
        //     y: wave.amplitude,
        //     r: wave.r,
        //     maxAmplitude: wave.maxAmlitude,
        // } 
        // waves.addWave(coords);
    }
}