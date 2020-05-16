import { view } from '../View/index.js';
import { waves } from '../Waves/index.js';
//import { Point } from './Point';
import { CANVAS_HEIGHT, CANVAS_WIDTH, X_AXIS_START_POSITION } from "../consts/canvas-consts";

export default class Wave {
    constructor() {
        this._w = CANVAS_WIDTH;
        this._h = CANVAS_HEIGHT;
        this.isStop = false;
        //window.requestAnimationFrame(this.animate)
        setInterval(() => {
            !this.isStop && this.animate()
        }, 0);
        this.setWave()
        
        view.onAmpClick(this.setAmplitude);
        view.onFreqClick(this.setFreq);

        view.onStopClick(()=> this.isStop = !this.isStop)
        
    }
    setAmplitude = (amp, id) => {
        const wave = waves.getWaveById(0)

        wave.forEach(el => {
            el.maxAmplitude = +amp * this._h/4
        });
    }

    setFreq = (f, id) => {
        const wave = waves.getWaveById(0)

        wave.forEach(el => {
            el.f = +f
        });
    }

    setWave = () => {
        const x = 399
        const maxAmlitude = 1 * this._h/4;
        const angleSpeed = 10
        const f = 1;

        waves.addWave({
            x, 
            maxAmplitude: maxAmlitude,
            angleSpeed,
            f: f,
            r:1.2,
            t: 0,
            id: 0,
            toRight: false,
            xt: 0,
            xIsStop: false,
            xSpeed: 1,
        });
        
    }

    animate = () => {  
        const arr = waves.getAllWaves();   

        arr.forEach(wave => {
            //console.log(wave);
            
            const last = {...wave[wave.length - 1]};

            wave.forEach((waveYet) => {
    
                const speed = 1

                if (waveYet.xIsStop) {
                    waveYet.x -= speed;
                    waveYet.prevX -= speed;
                }
         
                if (last.x > this._w) {
                    waveYet.xIsStop = true
                }
            });
     
            // if the wave is longer than area
            if (wave.length > CANVAS_WIDTH - X_AXIS_START_POSITION) wave.shift();

            const lastPoint = {...wave[wave.length - 1]}

            this.waveMove(lastPoint)
        });

    
        view.waveCanvas.draw(arr);
        //window.requestAnimationFrame(this.animate)
    }
    
    waveMove = (wave) => {
        wave.prevY = wave.y
  
        //y - current amplitude
        wave.prevX = wave.x
        wave.prevPhasorX = wave.phasorX

        // r = wave.maxAmplitude;
        wave.angleSpeed = 2 * Math.PI * (wave.f /(this._w/2))

        wave.y = this._h/2 - wave.maxAmplitude * Math.sin(wave.angleSpeed * wave.t)
        wave.phasorX = this._h/2 - wave.maxAmplitude * Math.cos(wave.angleSpeed * wave.t) - 150

        //console.log(wave.xIsStop);
        wave.xt = wave.xIsStop ? wave.xt : wave.t  

        wave.x = wave.xt + X_AXIS_START_POSITION
     
        !wave.toRight ? wave.t += wave.xSpeed : wave.t -= wave.xSpeed
        //debugger

        waves.addWaveById(wave.id, wave)
    }
}