import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'

export const CHANGE_PERCENTILE = 'customers_activity/change_percentile'
export const changePercentile = (payload: Payload<string, number>): PayloadAction<Payload<string, number>> => {
    return {
        type: CHANGE_PERCENTILE,
        payload: payload
    }
}

export const CHANGE_PERCENTILE_INCLUDE = 'customers_activity/change_percentile_include'
export const changePercentileInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_PERCENTILE_INCLUDE,
        payload: payload
    }
}

export const CHANGE_TRIBES = 'customers_activity/change_tribes'
export const changeTribes = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_TRIBES,
        payload: payload
    }
}

export const CHANGE_TRIBES_INCLUDE = 'customers_activity/change_tribes_include'
export const changeTribesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_TRIBES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_TICKETS_TAGS = 'customers_activity/change_tickets_tags'
export const changeTicketsTags = (payload: Payload<string, Array<number>>): PayloadAction<Payload<string, Array<number>>> => {
    return {
        type: CHANGE_TICKETS_TAGS,
        payload: payload
    }
}

export const CHANGE_TICKETS_TAGS_INCLUDE = 'customers_activity/change_tickets_tags_include'
export const changeTicketsTagsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_TICKETS_TAGS_INCLUDE,
        payload: payload
    }
}