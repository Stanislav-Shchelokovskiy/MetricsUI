import { SetState } from './Interfaces'
import { DEFAULT_SET } from './Defaults'
import { getFilterFields } from '../../../common/components/multiset_container/Toolbar/FilterTooltip'

export function getAliasedSet(set: SetState) {
    return {
        Percentile: set.percentile,
        'Ticket visibility': set.privacy,
        'Ticket owner': set.ownerKind,
        'Closed for': set.closedForInDays,
        Tribes: set.tribes,
        Tents: set.tents,
        Platforms: set.platforms,
        Products: set.products,
        'Versions': set.versions,
        'Ticket tags': set.ticketsTags,
        'Ticket types': set.ticketsTypes,
        'Fixed In': set.fixedIn,
        'Fixed': set.fixedBetween,
        'Severity': set.severity,
        'IDE': set.ides,
        'Operating systems': set.operatingSystems,
        'Frameworks/Specifics': set.frameworks,
        'Ticket statuses': set.ticketStatuses,
        'Closed': set.closedBetween,
        'Duplicated to ticket types': set.duplicatedToTicketsTypes,
        'User groups': set.customersGroups,
        'User types': set.customersTypes,
        'User conversion types': set.conversionsTypes,
        'Employees positions': set.positions,
        'Employees tribes': set.empTribes,
        'Employees tents': set.empTents,
        'Employees': set.employees,
        'Assigned to': set.assignedTo,
        'Closed by': set.closedBy,
        'Fixed by': set.fixedBy,
        'CAT replies types': set.repliesTypes,
        'CAT components': set.components,
        'CAT features': set.features,
        'Customers': set.customers,
    }
}

export function getSetDataFields() {
    return getFilterFields(getAliasedSet(DEFAULT_SET))
}
