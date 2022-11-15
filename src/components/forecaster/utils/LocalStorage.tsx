// export default function getValueFromStoreOrDefault<T>(key: string, defaultValue: T, validValues: Array<any> = []): T {
//     const storedValue: string | null = window.localStorage.getItem(key)

//     if (storedValue === null) {
//         return defaultValue
//     }

//     let parsedValue = JSON.parse(storedValue)

//     let parsedValueIsValid = true
//     if (validValues.length > 0) {
//         if (Array.isArray(parsedValue)) {
//             parsedValue = parsedValue.map(value => {
//                 return validValues.find(validValue => JSON.stringify(validValue) === JSON.stringify(value))
//             })
//             parsedValueIsValid = !parsedValue.includes(undefined)
//         }
//         else {
//             const stringifiedParsedValue = JSON.stringify(parsedValue)
//             parsedValue = validValues.find(value => JSON.stringify(value) === stringifiedParsedValue)
//             parsedValueIsValid = parsedValue !== undefined
//         }

//     }
//     return parsedValueIsValid ? parsedValue : defaultValue
// }

// export const saveValueToStore = (key: string, value: any): void => {
//     window.localStorage.setItem(key, JSON.stringify(value))
// }

export const loadState = (key: string = 'currentState') => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState !== null) {
            return JSON.parse(serializedState)
        }
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state: any, key: string = 'currentState') => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (err) {
        console.log(err)
    }
};
