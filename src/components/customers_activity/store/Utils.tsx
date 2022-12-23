import { FilterParametersNode } from './SetsReducer'

export function getFilterParametersNodeValuesOrDefault<T>(node: FilterParametersNode<T> | undefined, defaultValue: Array<T>): Array<T> {
    return node === undefined || node.include === false ? defaultValue : node.values
}
