import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'

export const CHANGE_VERSIONS = 'customers_activity/change_versions'
export const changeVersions = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_VERSIONS,
        payload: payload
    }
}

export const CHANGE_VERSIONS_INCLUDE = 'customers_activity/change_versions_include'
export const changeVersionsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_VERSIONS_INCLUDE,
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

export const CHANGE_IDEs = 'customers_activity/change_IDEs'
export const changeIDEs = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_IDEs,
        payload: payload
    }
}

export const CHANGE_IDEs_INCLUDE = 'customers_activity/change_IDEs_include'
export const changeIDEsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_IDEs_INCLUDE,
        payload: payload
    }
}

export const CHANGE_OPERATING_SYSTEMS = 'customers_activity/change_operating_systems'
export const changeOperatingSystems = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_OPERATING_SYSTEMS,
        payload: payload
    }
}

export const CHANGE_OPERATING_SYSTEMS_INCLUDE = 'customers_activity/change_operating_systems_include'
export const changeOperatingSystemsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_OPERATING_SYSTEMS_INCLUDE,
        payload: payload
    }
}

export const CHANGE_FRAMEWORKS = 'customers_activity/change_frameworks'
export const changeFrameworks = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_FRAMEWORKS,
        payload: payload
    }
}

export const CHANGE_FRAMEWORKS_INCLUDE = 'customers_activity/change_frameworks_include'
export const changeFrameworksInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_FRAMEWORKS_INCLUDE,
        payload: payload
    }
}
