interface FilterNode {
    include: boolean
}

export interface FilterParametersNode<T> extends FilterNode {
    values: Array<T>
}

export interface FilterParameterNode<T> extends FilterNode {
    value: T
}

export interface Set {
    title: string
    percentile: FilterParameterNode<number>
    privacy: FilterParameterNode<number> | undefined
    tribes: FilterParametersNode<string> | undefined
    platforms: FilterParametersNode<string> | undefined
    products: FilterParametersNode<string> | undefined
    ticketsTags: FilterParametersNode<number> | undefined
    ticketsTypes: FilterParametersNode<number> | undefined
    versions: FilterParametersNode<string> | undefined
    fixedIn: FilterParametersNode<string> | undefined
    fixedBetween: FilterParametersNode<string> | undefined
    severity: FilterParametersNode<string> | undefined
    ticketStatuses: FilterParametersNode<string> | undefined
    closedBetween: FilterParametersNode<string> | undefined
    ides: FilterParametersNode<string> | undefined
    operatingSystems: FilterParametersNode<string> | undefined
    frameworks: FilterParametersNode<string> | undefined
    duplicatedToTicketsTypes: FilterParametersNode<number> | undefined
    customersGroups: FilterParametersNode<string> | undefined
    customersTypes: FilterParametersNode<number> | undefined
    conversionsTypes: FilterParametersNode<number> | undefined
    positions: FilterParametersNode<string> | undefined
    empTribes: FilterParametersNode<string> | undefined
    employees: FilterParametersNode<string> | undefined
    assignedTo: FilterParametersNode<string> | undefined
    closedBy: FilterParametersNode<string> | undefined
    fixedBy: FilterParametersNode<string> | undefined
    repliesTypes: FilterParametersNode<string> | undefined
    components: FilterParametersNode<string> | undefined
    features: FilterParametersNode<string> | undefined
    customers: FilterParametersNode<string> | undefined
}
