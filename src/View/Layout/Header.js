import { createWrapper } from "./createWrapper"
import { readOnlyInput, label } from "./inputs/wave-input"
import './style.less';

export class Header { 
    constructor() {
        this.headerWrapper = createWrapper('header__wrapper') 

        this.ampRInp = createWrapper('amp-field__readOnly') 
        this.freqRInp = createWrapper('freq-field__readOnly')
        
        this.apmLabel = label('Instant amplitude(i):', 'amp-field__label')
        this.freqLabel = label('Phase:', 'freq-field__label')

        this.ampFieldWrapper = createWrapper('wrapper__amp-field')
        this.ampFieldWrapper.append(...[this.ampRInp, this.apmLabel])

        this.freqFieldWrapper = createWrapper('wrapper__freq-field')
        this.freqFieldWrapper.append(...[this.freqRInp, this.freqLabel])

        
        this.headerWrapper.append(...[this.ampFieldWrapper, this.freqFieldWrapper])
    }
}