import { SetState } from '../SetsReducer'
import {
    getDefaultFilterParameterNode,
    getDefaultFilterParametersNode,
    getOptionalDefaultFilterParameterNode,
} from '../../../common/store/multiset_container/sets/Defaults'
import { getDefaultTitle } from '../../../common/store/multiset_container/sets/Defaults'

export const DEFAULT_SET: SetState = {
    title: getDefaultTitle(),
    percentile: getDefaultFilterParameterNode<number>(100),
    ticketsTypes: getDefaultFilterParametersNode<number>([1]),
    privacy: getOptionalDefaultFilterParameterNode<number>(),
    tribes: getDefaultFilterParametersNode<string>(),
    tents: getDefaultFilterParametersNode<string>(),
    platforms: getDefaultFilterParametersNode<string>(),
    products: getDefaultFilterParametersNode<string>(),
    ticketsTags: getDefaultFilterParametersNode<string>(),
    versions: getDefaultFilterParametersNode<string>(),
    fixedIn: getDefaultFilterParametersNode<string>(),
    fixedBetween: getDefaultFilterParametersNode<string>(),
    severity: getDefaultFilterParametersNode<string>(),
    ticketStatuses: getDefaultFilterParametersNode<string>(),
    closedBetween: getDefaultFilterParametersNode<string>(),
    ides: getDefaultFilterParametersNode<string>(),
    operatingSystems: getDefaultFilterParametersNode<string>(),
    frameworks: getDefaultFilterParametersNode<string>(),
    duplicatedToTicketsTypes: getDefaultFilterParametersNode<number>(),
    customersGroups: getDefaultFilterParametersNode<string>(),
    customersTypes: getDefaultFilterParametersNode<number>(),
    conversionsTypes: getDefaultFilterParametersNode<number>(),
    positions: getDefaultFilterParametersNode<string>(),
    empTribes: getDefaultFilterParametersNode<string>(),
    empTents: getDefaultFilterParametersNode<string>(),
    employees: getDefaultFilterParametersNode<string>(),
    assignedTo: getDefaultFilterParametersNode<string>(),
    closedBy: getDefaultFilterParametersNode<string>(),
    fixedBy: getDefaultFilterParametersNode<string>(),
    repliesTypes: getDefaultFilterParametersNode<string>(),
    components: getDefaultFilterParametersNode<string>(),
    features: getDefaultFilterParametersNode<string>(),
    customers: getDefaultFilterParametersNode<string>(),
}

export const INITIAL_SETS: Array<SetState> = [DEFAULT_SET]
