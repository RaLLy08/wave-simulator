import { waveInput, label } from "./inputs/wave-input";
import { waveButton, stopButton, newWaveBtn } from "./buttons/button-wave";
import { createWrapper } from "./createWrapper";
import { select } from "./select";

export class Bottom {
    constructor() {
        this.bottomWrapper = document.createElement('div');

        this.bottomWrapper.className = 'wrapper__bottom';
        //default
        const waveSelect = select(0, [0,1]);
        //this.select = select;
        this.ampLabel = label('Amplitute (Imax)', 'amp-field__label');
        this.ampButton = waveButton() 
        this.ampInput = waveInput(1);

        const ampWrapper = createWrapper('fields__amp-field');
        ampWrapper.append(...[this.ampLabel, this.ampInput, this.ampButton]);

        this.freqLabel = label('Frequency per second', 'freq-field__label');
        this.freqButton = waveButton() 
        this.freqInput = waveInput(2);

        const freqWrapper = createWrapper('fields__freq-field');
        freqWrapper.append(...[this.freqLabel, this.freqInput, this.freqButton]);

        this.newWaveBtn = newWaveBtn();

        this.stopButton = stopButton();
        
        this.stopWrapper = createWrapper('bottom__stop-wrapper');
        this.stopWrapper.append(this.stopButton);

        const fields = createWrapper('bottom__fields')
        fields.append(...[ampWrapper, freqWrapper, waveSelect, this.newWaveBtn]);

        this.bottomWrapper.append(...[fields, this.stopWrapper])
    }
    
    changeInput = (amp, f) => {
        this.freqInput.value = f
        this.ampInput.value = amp
    }

}