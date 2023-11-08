import { BaseSetState } from '../../../common/store/multiset_container/sets/Interfaces'
import {
    RequiredNumberFilterParameter,
    NumberFilterParameter,
    StringFilterParameters,
    NumberFilterParameters,
    StrictNumberFilterParameters
} from '../../../common/store/multiset_container/sets/Interfaces'

export interface SetState extends BaseSetState {
    percentile: RequiredNumberFilterParameter
    privacy: NumberFilterParameter,
    ownerKind: NumberFilterParameter,
    platforms: StringFilterParameters
    products: StringFilterParameters
    ticketsTags: StringFilterParameters
    ticketsTypes: StrictNumberFilterParameters
    versions: StringFilterParameters
    fixedIn: StringFilterParameters
    fixedBetween: StringFilterParameters
    severity: StringFilterParameters
    ticketStatuses: StringFilterParameters
    closedBetween: StringFilterParameters
    ides: StringFilterParameters
    operatingSystems: StringFilterParameters
    frameworks: StringFilterParameters
    duplicatedToTicketsTypes: NumberFilterParameters
    customersGroups: StringFilterParameters
    customersTypes: NumberFilterParameters
    conversionsTypes: NumberFilterParameters
    assignedTo: StringFilterParameters
    closedBy: StringFilterParameters
    fixedBy: StringFilterParameters
    repliesTypes: StringFilterParameters
    components: StringFilterParameters
    features: StringFilterParameters
    customers: StringFilterParameters
}
