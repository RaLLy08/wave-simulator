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

        view.onStopClick(() => this.isStop = !this.isStop)
    }

    displayParams = (wave) => {
        //this.isStop = !this.isStop
        //const wave = waves.getWaveById(0)
        //const lastPoint = wave[wave.length - 1]

        const y = -Math.round(((wave.y - this._h/2)/180)*1000)/1000
        const f = wave.f;

       const phase = ((wave.angleSpeed * wave.t)*180/Math.PI | 0) % 360;
       
        const params = {
            y,
            phase,
        }

        view.displayParams(params)
    }

    setAmplitude = (amp, id) => {
        //view.waveCanvas._xAxisStartPosition += +amp*64*3
        
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
        const maxAmlitude = 1 * this._h/4;
        const angleSpeed = 1/this._w
        const f = 12;

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
        
        waves.addWave({ 
            maxAmplitude: 0.5 * this._h/4,
            //angleSpeed,
            f: 2,
            r:1.2,
            t: 0,
            id: 1,
            xt: 0,
            xIsStop: false,
            xSpeed: 1,
        });
        
    }

    animate = () => {  
        if (!this.isStop) {
            const arr = waves.getAllWaves();   
            console.log(arr);
            
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
        wave.phasorX = wave.maxAmplitude * Math.cos(wave.angleSpeed * wave.t)
        
        //console.log(wave.xIsStop);

        //wave.xt = wave.xIsStop ? wave.xt : wave.t  

        wave.x = wave.xt + X_AXIS_START_POSITION
        
        wave.t += 1;

        if (!wave.xIsStop) wave.xt = wave.t;
        
        //debugger
        
        //console.log(Math.sign(wave.prevY - this._h/2) !== Math.sign(wave.y - this._h/2));
        this.displayParams(wave);
        waves.addWaveById(wave.id, wave)
    }

    distance = (x1, y1, x2, y2) => Math.sqrt((Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)));
}