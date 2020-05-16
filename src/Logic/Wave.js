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
            this.animate()
        }, 0);
        this.setWave()
        
        view.onAmpClick(this.setAmplitude);
        view.onFreqClick(this.setFreq);

        view.onStopClick(this.stop)
    }
    stop = (id) => {
        this.isStop = !this.isStop
        const wave = waves.getWaveById(0)
        const lastPoint = wave[wave.length - 1]

        const currAmp = -Math.round(((lastPoint.y - this._h/2)/180)*10000)/10000
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
        const maxAmlitude = 0.2 * this._h/4;
        const angleSpeed = 1/this._w
        const f = 1;

        waves.addWave({ 
            maxAmplitude: maxAmlitude,
            //angleSpeed,
            f,
            r:1.2,
            t: 0,
            id: 0,
            xt: 0,
            xIsStop: false,
            xSpeed: 1,
        });
        
    }

    animate = () => {  
        if (!this.isStop) {
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
        }
        //window.requestAnimationFrame(this.animate)
    }
    
    waveMove = (wave) => {
        
        wave.prevY = wave.y
        wave.prevX = wave.x
        wave.prevPhasorX = wave.phasorX

        //y - current amplitude
        // r = wave.maxAmplitude;
        wave.angleSpeed = wave.angleSpeed && !wave.f ? wave.angleSpeed : 2 * Math.PI * (wave.f /(this._w/2));

        wave.y = this._h/2 - wave.maxAmplitude * Math.sin(wave.angleSpeed * wave.t)
        wave.phasorX = this._h/2 - wave.maxAmplitude * Math.cos(wave.angleSpeed * wave.t) - 150
        
        //console.log(wave.xIsStop);

        //wave.xt = wave.xIsStop ? wave.xt : wave.t  

        wave.x = wave.xt + X_AXIS_START_POSITION
        
        wave.t += 1;

        if (!wave.xIsStop) wave.xt = wave.t;
        
        //debugger
        
        //console.log(Math.sign(wave.prevY - this._h/2) !== Math.sign(wave.y - this._h/2));
        
        waves.addWaveById(wave.id, wave)
    }
}