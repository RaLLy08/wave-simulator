export const createWrapper = (name) => {
    const wrapper = document.createElement('div');
    wrapper.className = name;
    return wrapper;
}