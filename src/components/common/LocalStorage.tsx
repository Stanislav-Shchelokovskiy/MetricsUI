export function loadState<T = any>(key: string): T | undefined {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState) {
            return JSON.parse(serializedState) as T
        }
    } catch (err) {
        return undefined;
    }
}
export function saveState(state: any, key: string) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.log(err)
    }
}

export function dropState(key: string) {
    try {
        localStorage.removeItem(key)
    } catch (err) {
        console.log(err)
    }
}
