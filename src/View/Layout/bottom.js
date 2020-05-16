import { waveInput, label } from "./inputs/wave-input";
import { waveButton, stopButton } from "./buttons/button-wave";
import { createWrapper } from "./createWrapper";

export class Bottom {
    constructor() {
        this.bottomWrapper = document.createElement('div');

        this.bottomWrapper.className = 'wrapper__bottom';
  
        this.ampLabel = label('Amplitute (Imax)');
        this.ampButton = waveButton() 
        this.ampInput = waveInput();

        this.freqLabel = label('Frequency per second');
        this.freqButton = waveButton() 
        this.freqInput = waveInput();
        
        this.stopButton = stopButton();

        const ampWrapper = createWrapper('bottom__fieldWrapper');

        ampWrapper.append(...[this.ampLabel, this.ampInput, this.ampButton]);
        
        const freqWrapper = createWrapper('bottom__fieldWrapper');

        freqWrapper.append(...[this.freqLabel, this.freqInput, this.freqButton]);

        
        this.bottomWrapper.append(...[ampWrapper, freqWrapper, this.stopButton])

        //return bottomWrapper;
    }
}