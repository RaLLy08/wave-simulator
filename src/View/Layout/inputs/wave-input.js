export const waveInput = () => {
    const inp = document.createElement('input')
    return inp;
}

export const label = (text) => {
    const label = document.createElement('div');
    label.innerText = text;
    
    return label;
}