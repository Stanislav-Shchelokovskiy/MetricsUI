import { Set } from "./Interfaces"
import { DEFAULT_SET } from "./Defaults"

export function getAliasedSet(set: Set) {
    return {
        Percentile: set.percentile,
        Privacy: set.privacy,
        Tribes: set.tribes,
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
    return Object.getOwnPropertyNames(getAliasedSet(DEFAULT_SET)).map(x => {
        return {
            dataField: x,
            filterOperations: ['<=', '=', '!=', '>', 'in', 'notin', 'between', 'notbetween']
        }
    })
}
