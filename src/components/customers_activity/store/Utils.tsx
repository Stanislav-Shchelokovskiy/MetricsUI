import { FilterParametersNode } from './SetsReducer'

export function allNodesAreConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T>>) {
    for (const node of nodes)
        if (!node.include || node.values.length > 0)
            return false
    return true
}

export function anyNodeIsConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T>>) {
    for (const node of nodes)
        if (node.include && node.values.length === 0)
            return true
    return false
}
