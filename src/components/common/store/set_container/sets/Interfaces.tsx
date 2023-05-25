interface FilterNode {
    include: boolean
}

export interface FilterParametersNode<T> extends FilterNode {
    values: Array<T>
}

export interface FilterParameterNode<T> extends FilterNode {
    value: T
}

export interface BaseSetState {
    title: string
}
