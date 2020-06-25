export const select = (value, options) => {
    const selectEl = document.createElement('select');
    selectEl.value = value;
    selectEl.id = 'wave-select'
    selectEl.append(
        ...options.map((el) => {
            const option = document.createElement('option');
            option.append(el)
            return option
        })
    )
    return selectEl
}