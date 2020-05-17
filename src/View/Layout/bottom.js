import { waveInput, label } from "./inputs/wave-input";
import { waveButton, stopButton } from "./buttons/button-wave";
import { createWrapper } from "./createWrapper";

export class Bottom {
    constructor() {
        this.bottomWrapper = document.createElement('div');

        this.bottomWrapper.className = 'wrapper__bottom';
  
        this.ampLabel = label('Amplitute (Imax)', 'amp-field__label');
        this.ampButton = waveButton() 
        this.ampInput = waveInput();

        const ampWrapper = createWrapper('fields__amp-field');
        ampWrapper.append(...[this.ampLabel, this.ampInput, this.ampButton]);

        this.freqLabel = label('Frequency per second', 'freq-field__label');
        this.freqButton = waveButton() 
        this.freqInput = waveInput();

        const freqWrapper = createWrapper('fields__freq-field');
        freqWrapper.append(...[this.freqLabel, this.freqInput, this.freqButton]);


        this.stopButton = stopButton();
        
        this.stopWrapper = createWrapper('bottom__stop-wrapper');
        this.stopWrapper.append(this.stopButton);

        const fields = createWrapper('bottom__fields')
        fields.append(...[ampWrapper, freqWrapper]);

        this.bottomWrapper.append(...[fields, this.stopWrapper])
    }
}