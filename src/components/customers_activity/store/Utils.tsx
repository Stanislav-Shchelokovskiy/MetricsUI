import { FilterParametersNode } from './SetsReducer'

export function getFilterParametersNodeValuesOrDefault<T>(node: FilterParametersNode<T> | undefined, defaultValue: Array<T>): Array<T> {
    return node === undefined || node.include === false ? defaultValue : node.values
}

export function areNodesConsideredEmpty<T>(...nodes: Array<FilterParametersNode<T>>) {
    for (const node of nodes)
        if (!node.include || node.values.length > 0)
            return false
    return true
}