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
