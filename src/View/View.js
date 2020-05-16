import Canvas from "../Canvas";
import { bottom, fieldWrapper } from "./Layout/bottom";
import { waveInput } from "./inputs/wave-input";
import { waveButton, stopButton } from "./buttons/button-wave";


export default class View { 
    constructor() {
        this.waveCanvas = new Canvas();
        this._ctx =  this.waveCanvas._ctx;
        this._canvas =  this.waveCanvas._canvas;
        this._canvas.style.border = "3px solid black";
        this._root = document.getElementById('root');

        const canvasWrapper = document.createElement('div');
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper'

        const bottomWrapper = bottom();
        

        this.ampButton = waveButton() 
        this.ampInput = waveInput();

        this.freqButton = waveButton() 
        this.freqInput = waveInput();
        
        this.stopButton = stopButton();

        const ampWrapper = fieldWrapper();

        ampWrapper.append(...[this.ampInput, this.ampButton]);
        
        const freqWrapper = fieldWrapper();

        freqWrapper.append(...[this.freqInput, this.freqButton]);

        

        bottomWrapper.append(...[ampWrapper, freqWrapper, this.stopButton])

        canvasWrapper.append(this._canvas)

        wrapper.append(...[canvasWrapper, bottomWrapper])
        this._root.append(wrapper);
    }
    
    onAmpClick = cb => {
        this.ampButton.onclick = () => {
            const value = this.ampInput.value;
            cb(value)
        }
    }
    
    onFreqClick = cb => {
        this.freqButton.onclick = () => {
            const value = this.freqInput.value;
            cb(value)
        }
    }

    onStopClick = cb => {
        let isStop = false;
        this.stopButton.onclick = () => {
            isStop = !isStop;
            this.stopButton.innerText = isStop ? 'Resume' : 'Stop';
            this.stopButton.style.backgroundColor = isStop ? '#00cc00': 'red';
            cb(isStop)
        }
    }
}