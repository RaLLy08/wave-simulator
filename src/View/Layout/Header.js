import { createWrapper } from "./createWrapper"
import { label } from "./inputs/wave-input"
import './style.less';

export class Header { 
    constructor() {
        this.headerWrapper = createWrapper('wrapper__header') 

        this.waves = [];    
    }

    setWaveInputs = (id) => {
        const ampRInp = createWrapper('amp-field__readOnly', `amp${id}`) 
        const apmLabel = label('Instant amplitude(i):', 'amp-field__label')
        
        const waveNumber = label(`${id + 1} wave:`, 'wave-num__label')

        const freqRInp = createWrapper('freq-field__readOnly', `phase${id}`)
        const freqLabel = label('Phase:', 'freq-field__label')

        const ampFieldWrapper = createWrapper('wrapper__amp-field')
        const freqFieldWrapper = createWrapper('wrapper__freq-field')

        ampFieldWrapper.append(...[ampRInp, apmLabel])
        freqFieldWrapper.append(...[freqRInp, freqLabel])

        const waveWrapper = createWrapper('header__wave-wrapper');

        waveWrapper.append(...[waveNumber, ampFieldWrapper, freqFieldWrapper])

        this.waves.push(waveWrapper);

        this.appendWaves()
    }

    appendWaves = () => {
        this.headerWrapper.append(...this.waves)
    }
}