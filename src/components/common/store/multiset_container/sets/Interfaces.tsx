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
    tents: FilterParametersNode<string> | undefined
    empTents: FilterParametersNode<string> | undefined
    positions: FilterParametersNode<string> | undefined
    employees: FilterParametersNode<string> | undefined
}
