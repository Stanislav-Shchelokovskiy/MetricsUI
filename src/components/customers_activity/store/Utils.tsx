import { FilterParametersNode } from './sets_reducer/Interfaces'

export function allNodesAreConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T> | undefined>): boolean {
    for (const node of nodes)
        if (!nodeIsEmpty<T>(node))
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
    return (
        node === undefined ||
        (node.include && node.values.length === 0) || (
            mustHaveValue !== undefined && (
                (node.include && !node.values.includes(mustHaveValue)) ||
                (!node.include && node.values.includes(mustHaveValue))
            )
        )
    )
}

export function anyValueIsEmpty(...values: Array<any>): boolean {
    for (const value of values)
        if (value === undefined || value === null || value.toString() === '')
            return true
    return false
}


export function bugIsNotSelected(node: FilterParametersNode<number> | undefined): boolean {
    const BUG = 2
    return nodeIsEmpty(node, BUG)
}

export function closedIsNotSelected(node: FilterParametersNode<string> | undefined): boolean {
    const CLOSED = 'Closed'
    return nodeIsEmpty(node, CLOSED)
}
