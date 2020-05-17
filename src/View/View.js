import Canvas from "../Canvas";
import './style.less'
import { Bottom } from "./Layout/Bottom";
import { Header } from "./Layout/Header";

export default class View { 
    constructor() {
        this.waveCanvas = new Canvas();
        this._canvas =  this.waveCanvas._canvas;
        this._canvas.style.border = "3px solid black";
        this._root = document.getElementById('root');

        const canvasWrapper = document.createElement('div');
        canvasWrapper.className = 'canvas-wrapper'
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper'

        this.bottom = new Bottom();
        this.header = new Header();

        canvasWrapper.append(this._canvas)


        wrapper.append(...[this.header.headerWrapper, canvasWrapper, this.bottom.bottomWrapper])
        this._root.append(wrapper);
    }
    
    onAmpClick = cb => {
        this.bottom.ampButton.onclick = () => {
            const value = this.bottom.ampInput.value;
            cb(value)
        }
    }
    
    onFreqClick = cb => {
        this.bottom.freqButton.onclick = () => {
            const value = this.bottom.freqInput.value;
            cb(value)
        }
    }

    onStopClick = cb => {
        let isStop = false;
        this.bottom.stopButton.onclick = () => {
            isStop = !isStop;
            this.bottom.stopButton.innerText = isStop ? 'Resume' : 'Stop';
            this.bottom.stopButton.style.backgroundColor = isStop ? '#00cc00': 'red';
            cb(isStop)
        }
    }

    displayParams = (params) => {
        const {y, f, phase, angleSpeed} = params

        this.header.ampRInp.innerText = y
        this.header.freqRInp.innerText = phase
    }
}