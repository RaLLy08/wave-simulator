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

    displayParams = ({phase, angleSpeed, t, y, id, f, maxAmplitude, waveForm}) => {
        const amp = -Math.round(((y - this._h/2)/180)*1000)/1000
        //let clearPhase = Math.asin((y - this._h/2)/maxAmplitude) * (180/Math.PI);
        let clearPhase = ((angleSpeed * t + phase*Math.PI/180)*180/Math.PI | 0) % 360;
        //if (waveForm === 'cosine') clearPhase = ((angleSpeed * t + phase*Math.PI/180)*180/Math.PI | 0) % 360;
        if (waveForm === 'meander') clearPhase = Math.asin((y - this._h/2)/maxAmplitude) * (180/Math.PI) + 180;
        
        const params = {
            id,
            amp,
            phase: clearPhase,  
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
        const angleSpeed = 6.283 / (64 * 10)
        const f = 2;
        // distance between 2 schale points are equal to 64 px by x, by y - 36, and the values of points y and x - 20;

        waves.addWave({ 
            maxAmplitude: maxAmlitude,
            //angleSpeed,
            f,
            r:1.2,
            t: 0,
            id: 0,
            xIsStop: false,
            xSpeed: 1,
            color: 'black',
            phase: 0,
            waveForm: 'cosine',
        });
        view.displayWaveFields(0)

        // waves.addWave({ 
        //     maxAmplitude: 0.5 * this._h/4,
        //     //angleSpeed,
        //     f: 2,
        //     r:1.2,
        //     t: 0,
        //     id: 1,
        //     xt: 0,
        //     xIsStop: false,
        //     xSpeed: 1,
        //     phase: 0,
        //     color: 'blue',
        //     waveForm: 'sine',
        // });
        // view.displayWaveFields(1)

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
        const {
            x,
            y,
            phasorX,
        } = wave

        wave.prevX = x
        wave.prevY = y
        wave.prevPhasorX = phasorX
        
        //y - current amplitude
        // r = wave.maxAmplitude;
        //frequency is preferred
        wave.angleSpeed = wave.angleSpeed && !wave.f ? wave.angleSpeed : 2 * Math.PI * (wave.f /(this._w/2));

        this.changeByWaveForm(wave);
        
        wave.x = wave.xt + X_AXIS_START_POSITION
        wave && this.displayParams(wave);
        
        if (!wave.xIsStop) wave.xt = wave.t;
        
        //debugger
        
        //console.log(Math.sign(wave.prevY - this._h/2) !== Math.sign(wave.y - this._h/2));
        wave.t += 1;
        
        waves.addWaveById(wave.id, wave);
    }

    changeByWaveForm = (wave) => {
        switch (wave.waveForm) {
            case 'sine':
                wave.y = this._h/2 - wave.maxAmplitude * Math.sin(wave.angleSpeed * wave.t + wave.phase * Math.PI/180)
                wave.phasorX = wave.maxAmplitude * Math.cos(wave.angleSpeed * wave.t + wave.phase * Math.PI/180)
                break;
            case 'cosine':
                wave.y = this._h/2 - wave.maxAmplitude * Math.cos(wave.angleSpeed * wave.t + wave.phase * Math.PI/180)
                wave.phasorX = wave.maxAmplitude * Math.sin(wave.angleSpeed * wave.t + wave.phase * Math.PI/180)
                break;
            case 'meander':
                wave.y = this._h/2 - wave.maxAmplitude * Math.sign(Math.sin(wave.angleSpeed * wave.t + wave.phase * Math.PI/180))
                wave.phasorX = 0
                break;
            default:
                wave.y = this._h/2 - wave.maxAmplitude * Math.sin(wave.angleSpeed * wave.t + wave.phase * Math.PI/180)
                wave.phasorX = wave.maxAmplitude * Math.cos(wave.angleSpeed * wave.t + wave.phase * Math.PI/180)
        }
    }


    distance = (x1, y1, x2, y2) => Math.sqrt((Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)));
}