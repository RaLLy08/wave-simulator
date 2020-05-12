export class Waves {
    constructor() {
        this._waves = [];
    }
    
    getWaves= () => [...this._waves]

    addWave = (wave) => this._waves.push(wave);

    clearWaves = () => this._waves = [];
}