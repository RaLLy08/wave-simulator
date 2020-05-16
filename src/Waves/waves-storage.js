export class Waves {
    constructor() {
        this._waves = [];
    }
    
    getAllWaves= () => this._waves;

    getWaveById = (id) => this._waves[id];

    //getLastWave = (id) => this._waves[id][this._waves.length - 1];

    addWave = (wave) => this._waves.push([wave]);

    addWaveById = (id, wave) => this._waves[id].push(wave)

    clearAllWaves = () => this._waves = [];
}