import { Set } from './Interfaces'
import { 
    getDefaultFilterParameterNode,
    getDefaultFilterParametersNode,
    getOptionalDefaultFilterParameterNode,
} from '../../../common/store/set_container/sets/Defaults'

export const DEFAULT_SET: Set = {
    title: '0',
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

export const INITIAL_SETS: Array<Set> = [DEFAULT_SET]
