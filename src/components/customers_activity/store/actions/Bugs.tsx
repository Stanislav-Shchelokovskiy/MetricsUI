import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'


export const CHANGE_FIXED_IN = 'customers_activity/change_fixed_id'
export const changeFixedIn = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_FIXED_IN,
        payload: payload
    }
}

export const CHANGE_FIXED_IN_INCLUDE = 'customers_activity/change_fixed_in_include'
export const changeFixedInInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_FIXED_IN_INCLUDE,
        payload: payload
    }
}

export const CHANGE_SEVERITY = 'customers_activity/change_severity'
export const changeSeverity = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_SEVERITY,
        payload: payload
    }
}

export const CHANGE_SEVERITY_INCLUDE = 'customers_activity/change_severity_include'
export const changeSeverityInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_SEVERITY_INCLUDE,
        payload: payload
    }
}

export const CHANGE_STATUSES = 'customers_activity/change_ticket_statuses'
export const changeTicketStatuses = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_STATUSES,
        payload: payload
    }
}

export const CHANGE_TICKET_STATUSES_INCLUDE = 'customers_activity/change_ticket_statuses_include'
export const changeTicketStatusesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_TICKET_STATUSES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_ASSIGNED_TO = 'customers_activity/change_assigned_to'
export const changeAssignedTo = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_ASSIGNED_TO,
        payload: payload
    }
}

export const CHANGE_ASSIGNED_TO_INCLUDE = 'customers_activity/change_assigned_to_include'
export const changeAssignedToInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_ASSIGNED_TO_INCLUDE,
        payload: payload
    }
}
