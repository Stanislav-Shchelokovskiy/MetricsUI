import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'

export const CHANGE_TICKETS_TYPES = 'customers_activity/change_tickets_types'
export const changeTicketsTypes = (payload: Payload<string, Array<number>>): PayloadAction<Payload<string, Array<number>>> => {
    return {
        type: CHANGE_TICKETS_TYPES,
        payload: payload
    }
}

export const CHANGE_TICKETS_TYPES_INCLUDE = 'customers_activity/change_tickets_types_include'
export const changeTicketsTypesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_TICKETS_TYPES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_DUPLICATED_TO_TICKETS_TYPES = 'customers_activity/change_duplicated_to_tickets_types'
export const changeDuplicatedToTicketTypes = (payload: Payload<string, Array<number>>): PayloadAction<Payload<string, Array<number>>> => {
    return {
        type: CHANGE_DUPLICATED_TO_TICKETS_TYPES,
        payload: payload
    }
}

export const CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE = 'customers_activity/change_duplicated_to_tickets_types_include'
export const changeDuplicatedToTicketsTypesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_DUPLICATED_TO_TICKETS_TYPES_INCLUDE,
        payload: payload
    }
}
