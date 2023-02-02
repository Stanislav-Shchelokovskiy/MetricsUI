import { FilterParametersNode } from './SetsReducer'

export function allNodesAreConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T>>): boolean {
    for (const node of nodes)
        if (node !== undefined && (!node.include || node.values.length > 0))
            return false
    return true
}

export function anyNodeIsConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T>>): boolean {
    for (const node of nodes)
        if (node === undefined || (node.include && node.values.length === 0))
            return true
    return false
}

export function anyValueIsEmpty(...values: Array<any>): boolean {
    for (const value of values)
        if (value === undefined || value === null || value.toString() === '')
            return true
    return false
}
