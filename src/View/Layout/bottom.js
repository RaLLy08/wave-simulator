import { waveInput, label } from "./inputs/wave-input";
import { waveButton, stopButton, newWaveBtn } from "./buttons/button-wave";
import { createWrapper } from "./createWrapper";
import { select } from "./select";

export class Bottom {
    constructor() {
        this.bottomWrapper = createWrapper('wrapper__bottom');

        //default
        //this.select = select;
        const ampWrapper = this.getAmpWrapper()
        const freqWrapper = this.getFreqWrapper()
        const setPanel = this.getWaveSetWrapper()
        const stopWrapper = this.getStopWrapper()


        const fields = createWrapper('bottom__fields')
        fields.append(...[ampWrapper, freqWrapper]);

        this.bottomWrapper.append(...[fields, setPanel, stopWrapper])
    }

    changeInput = (amp, f) => {
        this.freqInput.value = f
        this.ampInput.value = amp
    }

    getAmpWrapper = () => {
        this.ampLabel = label('Amplitute (Imax)', 'amp-field__label');
        this.ampButton = waveButton() 
        this.ampInput = waveInput(1);

        const ampWrapper = createWrapper('fields__amp-field');
        ampWrapper.append(...[this.ampLabel, this.ampInput, this.ampButton]);

        return ampWrapper
    }

    getFreqWrapper = () => {
        this.freqLabel = label('Frequency per second', 'freq-field__label');
        this.freqButton = waveButton() 
        this.freqInput = waveInput(2);

        const freqWrapper = createWrapper('fields__freq-field');

        freqWrapper.append(...[this.freqLabel, this.freqInput, this.freqButton]);
        
        return freqWrapper;
    }

    getWaveSetWrapper = () => {
        const wrapper = createWrapper('bottom__wave-set-wrapper');

        const waveSelect = select(0, [0,1]);
        const newBtn = newWaveBtn();

        wrapper.append(...[waveSelect, newBtn]);

        return wrapper
    }
    
    getStopWrapper = () => {
        this.stopButton = stopButton();

        const stopWrapper = createWrapper('bottom__stop-wrapper');
        stopWrapper.append(...[this.stopButton]);

        return stopWrapper;
    }

    
}