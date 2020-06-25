export const waveInput = (value) => {
    const inp = document.createElement('input')
    //inp.style.fontSize = '14px'
    if (value) inp.value = value;
    return inp;
}

export const label = (text, name) => {
    const label = document.createElement('div');
    if (name) label.className = name;
    label.innerText = text;
    
    return label;
}