import Canvas from "../Canvas";
import { bottom } from "./Layout/bottom";
import { waveInput } from "./inputs/wave-input";
import { waveButton } from "./buttons/button-wave";


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

        const bottomWrapper = bottom()
        this.button = waveButton()
        
        this.input = waveInput();
        bottomWrapper.append(this.input);
        bottomWrapper.append(this.button);

        canvasWrapper.append(this._canvas)
        wrapper.append(...[canvasWrapper, bottomWrapper])
        this._root.append(wrapper);
    }
    
    onButtonClick = (cb) => {
        this.button.onclick = () => {
            const value = this.input.value;
            cb(value)
        }
    }
}