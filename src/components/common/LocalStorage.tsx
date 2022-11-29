export const loadState = (key: string) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState !== null) {
            return JSON.parse(serializedState)
        }
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state: any, key: string) => {
    console.log(key)
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.log(err)
    }
}
