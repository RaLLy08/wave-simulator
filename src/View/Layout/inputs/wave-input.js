export const waveInput = () => {
    const inp = document.createElement('input')

    return inp;
}

export const label = (text, name) => {
    const label = document.createElement('div');
    if (name) label.className = name;
    label.innerText = text;
    
    return label;
}