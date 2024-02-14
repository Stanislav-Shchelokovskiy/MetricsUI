import { SetState } from './Interfaces'
import { DEFAULT_SET } from './Defaults'
import { getFilterFields } from '../../../common/components/multiset_container/Toolbar/FilterTooltip'
import { isTicketLifetimeSelected, isTicketResolutionTimeSelected } from '../../../common/store/multiset_container/Selectors'
import { getFilterParameter, getFilterParameters } from '../../../common/store/multiset_container/sets/Defaults'
import { paramOrDefault } from '../../../common/store/multiset_container/Utils'

export function getAliasedSet(set: SetState, metric: string) {
    return {
        Percentile: { metric: metric, value: set.percentile },
        'Ticket visibility': set.privacy,
        'Ticket owner': set.ownerKind,
        'Closed for': getClosedFor(metric, set),
        'Resolution time': getResolutionTime(metric, set),
        Tribes: set.tribes,
        Tents: set.tents,
        Platforms: set.platforms,
        Products: set.products,
        'Versions': set.versions,
        'Ticket tags': getTicketTags(metric, set),
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
        'Roles': set.roles,
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

function getClosedFor(metric: string, set: SetState) {
    return isTicketLifetimeSelected(metric) ? getFilterParameter<number>(21) : set.closedForInDays
}

function getResolutionTime(metric: string, set: SetState) {
    return isTicketResolutionTimeSelected(metric) ? getFilterParameters<number>([0, 192]) : set.resolutionTimeInhours
}

function getTicketTags(metric: string, set: SetState) {
    if (isTicketResolutionTimeSelected(metric)) {
        const additionalTags = paramOrDefault(set.ticketsTags).values
        return getFilterParameters<string>([
            "(64)"  /* security issue (pass through Ray) */,
            "(179)" /* support for Ray */,
            "(4)"   /* escalated */,
            "(94)"  /* postponed */,
            "(168)" /* veracode */,
            ...additionalTags,
        ])
    }
    return set.ticketsTags
}

export function getSetDataFields() {
    return getFilterFields(getAliasedSet(DEFAULT_SET, ''))
}
