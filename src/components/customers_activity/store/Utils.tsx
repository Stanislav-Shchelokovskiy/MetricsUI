import { FilterParametersNode } from './SetsReducer'

export function allNodesAreConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T> | undefined>): boolean {
    for (const node of nodes)
        if (node !== undefined && (!node.include || node.values.length > 0))
            return false
    return true
}

export function anyNodeIsConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T> | undefined>): boolean {
    for (const node of nodes)
        if (nodeIsEmpty<T>(node))
            return true
    return false
}

export function nodeIsEmpty<T>(node: FilterParametersNode<T> | undefined, mustHaveValue: T | undefined = undefined) {
    return node === undefined || (node.include && node.values.length === 0) || (mustHaveValue !== undefined && !node.values.includes(mustHaveValue))
}

export function anyValueIsEmpty(...values: Array<any>): boolean {
    for (const value of values)
        if (value === undefined || value === null || value.toString() === '')
            return true
    return false
}

export function dateToISOstr(date: Date): string {
    const offset = date.getTimezoneOffset()
    return new Date(date.getTime() - (offset * 60 * 1000)).toISOString().slice(0, 10)
}
