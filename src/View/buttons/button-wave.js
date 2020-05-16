import './style.less';

export const waveButton = () => {
    const btn = document.createElement('button')
    btn.className = 'wave-set__button'
    return btn;
}

export const stopButton = (cb) => {
    const btn = document.createElement('button')
    let isStop = false;

    btn.className = 'wave-stop__button'
    btn.style.padding = '10px';
    btn.innerText = 'Stop';
    btn.style.backgroundColor = 'red';
   
    return btn;
}