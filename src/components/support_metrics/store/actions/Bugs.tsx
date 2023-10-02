import {
    getValuesPayloadAction,
    getIncludePayloadAction
} from '../../../common/store/multiset_container/sets/actions/Actions'

export const CHANGE_FIXED_IN = 'change_fixed_id'
export const changeFixedIn = getValuesPayloadAction<string>(CHANGE_FIXED_IN)

export const CHANGE_FIXED_IN_INCLUDE = 'change_fixed_in_include'
export const changeFixedInInclude = getIncludePayloadAction(CHANGE_FIXED_IN_INCLUDE)


export const CHANGE_SEVERITY = 'change_severity'
export const changeSeverity = getValuesPayloadAction<string>(CHANGE_SEVERITY)

export const CHANGE_SEVERITY_INCLUDE = 'change_severity_include'
export const changeSeverityInclude = getIncludePayloadAction(CHANGE_SEVERITY_INCLUDE)


export const CHANGE_TICKET_STATUSES = 'change_ticket_statuses'
export const changeTicketStatuses = getValuesPayloadAction<string>(CHANGE_TICKET_STATUSES)

export const CHANGE_TICKET_STATUSES_INCLUDE = 'change_ticket_statuses_include'
export const changeTicketStatusesInclude = getIncludePayloadAction(CHANGE_TICKET_STATUSES_INCLUDE)


export const CHANGE_ASSIGNED_TO = 'change_assigned_to'
export const changeAssignedTo = getValuesPayloadAction<string>(CHANGE_ASSIGNED_TO)

export const CHANGE_ASSIGNED_TO_INCLUDE = 'change_assigned_to_include'
export const changeAssignedToInclude = getIncludePayloadAction(CHANGE_ASSIGNED_TO_INCLUDE)


export const CHANGE_CLOSED_BY = 'change_closed_by'
export const changeClosedBy = getValuesPayloadAction<string>(CHANGE_CLOSED_BY)

export const CHANGE_CLOSED_BY_INCLUDE = 'change_closed_by_include'
export const changeClosedByInclude = getIncludePayloadAction(CHANGE_CLOSED_BY_INCLUDE)


export const CHANGE_FIXED_BY = 'change_fixed_by'
export const changeFixedBy = getValuesPayloadAction<string>(CHANGE_FIXED_BY)

export const CHANGE_FIXED_BY_INCLUDE = 'change_fixed_by_include'
export const changeFixedByInclude = getIncludePayloadAction(CHANGE_FIXED_BY_INCLUDE)


export const CHANGE_CLOSED_BETWEEN = 'change_closed_between'
export const changeClosedBetween = getValuesPayloadAction<string>(CHANGE_CLOSED_BETWEEN)

export const CHANGE_CLOSED_BETWEEN_INCLUDE = 'change_closed_between_include'
export const changeClosedBetweenInclude = getIncludePayloadAction(CHANGE_CLOSED_BETWEEN_INCLUDE)


export const CHANGE_FIXED_BETWEEN = 'change_fixed_between'
export const changeFixedBetween = getValuesPayloadAction<string>(CHANGE_FIXED_BETWEEN)

export const CHANGE_FIXED_BETWEEN_INCLUDE = 'change_fixed_between_include'
export const changeFixedBetweenInclude = getIncludePayloadAction(CHANGE_FIXED_BETWEEN_INCLUDE)
