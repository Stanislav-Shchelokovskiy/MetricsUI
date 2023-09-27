import { BaseSetState } from '../../../common/store/multiset_container/sets/Interfaces'
import { FilterParameterNode, FilterParametersNode } from '../../../common/store/multiset_container/sets/Interfaces'

export interface SetState extends BaseSetState {
    percentile: FilterParameterNode<number>
    privacy: FilterParameterNode<number> | undefined
    tribes: FilterParametersNode<string> | undefined
    platforms: FilterParametersNode<string> | undefined
    products: FilterParametersNode<string> | undefined
    ticketsTags: FilterParametersNode<string> | undefined
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
    assignedTo: FilterParametersNode<string> | undefined
    closedBy: FilterParametersNode<string> | undefined
    fixedBy: FilterParametersNode<string> | undefined
    repliesTypes: FilterParametersNode<string> | undefined
    components: FilterParametersNode<string> | undefined
    features: FilterParametersNode<string> | undefined
    customers: FilterParametersNode<string> | undefined
}
