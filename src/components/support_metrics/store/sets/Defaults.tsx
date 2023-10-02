import { SetState } from './Interfaces'
import {
    getFilterParameter,
    getFilterParameters,
    getOptionalFilterParameters,
    getOptionalFilterParameter,
    getDefaultBaseSet,
} from '../../../common/store/multiset_container/sets/Defaults'

export const DEFAULT_SET: SetState = {
    ...getDefaultBaseSet(),
    percentile: getFilterParameter<number>(100),
    ticketsTypes: getFilterParameters<number>([1]),
    privacy: getOptionalFilterParameter<number>(),
    platforms: getOptionalFilterParameters<string>(),
    products: getOptionalFilterParameters<string>(),
    ticketsTags: getOptionalFilterParameters<string>(),
    versions: getOptionalFilterParameters<string>(),
    fixedIn: getOptionalFilterParameters<string>(),
    fixedBetween: getOptionalFilterParameters<string>(),
    severity: getOptionalFilterParameters<string>(),
    ticketStatuses: getOptionalFilterParameters<string>(),
    closedBetween: getOptionalFilterParameters<string>(),
    ides: getOptionalFilterParameters<string>(),
    operatingSystems: getOptionalFilterParameters<string>(),
    frameworks: getOptionalFilterParameters<string>(),
    duplicatedToTicketsTypes: getOptionalFilterParameters<number>(),
    customersGroups: getOptionalFilterParameters<string>(),
    customersTypes: getOptionalFilterParameters<number>(),
    conversionsTypes: getOptionalFilterParameters<number>(),
    assignedTo: getOptionalFilterParameters<string>(),
    closedBy: getOptionalFilterParameters<string>(),
    fixedBy: getOptionalFilterParameters<string>(),
    repliesTypes: getOptionalFilterParameters<string>(),
    components: getOptionalFilterParameters<string>(),
    features: getOptionalFilterParameters<string>(),
    customers: getOptionalFilterParameters<string>(),
}

export const INITIAL_SETS: Array<SetState> = [DEFAULT_SET]
