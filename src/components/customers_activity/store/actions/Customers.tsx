import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'

export const CHANGE_CUSTOMERS_GROUPS = 'customers_activity/change_customers_groups'
export const changeCustomersGroups = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_CUSTOMERS_GROUPS,
        payload: payload
    }
}

export const CHANGE_CUSTOMERS_GROUPS_INCLUDE = 'customers_activity/change_customers_groups_include'
export const changeCustomersGroupsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_CUSTOMERS_GROUPS_INCLUDE,
        payload: payload
    }
}

export const CHANGE_CUSTOMERS_TYPES = 'customers_activity/change_customers_types'
export const changeCustomersTypes = (payload: Payload<string, Array<number>>): PayloadAction<Payload<string, Array<number>>> => {
    return {
        type: CHANGE_CUSTOMERS_TYPES,
        payload: payload
    }
}

export const CHANGE_CUSTOMERS_TYPES_INCLUDE = 'customers_activity/change_customers_types_include'
export const changeCustomersTypesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_CUSTOMERS_TYPES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_CONVERSIONS_TYPES = 'customers_activity/change_conversions_types'
export const changeConversionsTypes = (payload: Payload<string, Array<number>>): PayloadAction<Payload<string, Array<number>>> => {
    return {
        type: CHANGE_CONVERSIONS_TYPES,
        payload: payload
    }
}

export const CHANGE_CONVERSIONS_TYPES_INCLUDE = 'customers_activity/change_conversions_types_include'
export const changeConversionsTypesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_CONVERSIONS_TYPES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_CUSTOMERS = 'customers_activity/change_customers'
export const changeCustomers = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_CUSTOMERS,
        payload: payload
    }
}

export const CHANGE_CUSTOMERS_INCLUDE = 'customers_activity/change_customers_include'
export const changeCustomersInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_CUSTOMERS_INCLUDE,
        payload: payload
    }
}
