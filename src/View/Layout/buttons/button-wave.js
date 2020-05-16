import './style.less';

export const waveButton = () => {
    const btn = document.createElement('button')
    btn.className = 'wave-set__button'
    btn.innerText = 'SET'
    return btn;
}

export const stopButton = () => {
    const btn = document.createElement('button')

    btn.className = 'wave-stop__button'
    btn.style.padding = '10px';
    btn.innerText = 'Stop';
    btn.style.backgroundColor = 'red';
   
    return btn;
}