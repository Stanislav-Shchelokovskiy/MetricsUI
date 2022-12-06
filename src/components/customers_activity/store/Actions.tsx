import { PayloadAction } from '@reduxjs/toolkit'
import { Tribe, Payload } from '../../common/Interfaces'
import { CustomersGroup } from '../network_resource_fetcher/FetchCustomersGroups'
import { TicketsType } from '../network_resource_fetcher/FetchTicketsTypes'
import { TicketsTag } from '../network_resource_fetcher/FetchTicketsTags'
import { ReplyType } from '../network_resource_fetcher/FetchRepliesTypes'


export const CHANGE_PERIOD = 'customers_activity/change_period'
export const changePeriod = (period: Array<Date>): PayloadAction<Array<string>> => {
    return {
        type: CHANGE_PERIOD,
        payload: period.map((x => {
            const offset = x.getTimezoneOffset()
            return new Date(x.getTime() - (offset * 60 * 1000)).toISOString().slice(0, 10)
        }))
    }
}

export const CHANGE_GROUP_BY_PERIOD = 'customers_activity/change_group_by_period'
export const changeGroupByPeriod = (groupBy: string): PayloadAction<string> => {
    return {
        type: CHANGE_GROUP_BY_PERIOD,
        payload: groupBy
    }
}

export const CHANGE_METRIC = 'customers_activity/change_metric'
export const changeMetric = (metric: string): PayloadAction<string> => {
    return {
        type: CHANGE_METRIC,
        payload: metric
    }
}

export const CHANGE_COMPARISON_METHOD = 'customers_activity/change_comparison_method'
export const changeComparisonMethod = (comparisonMethod: string): PayloadAction<string> => {
    return {
        type: CHANGE_COMPARISON_METHOD,
        payload: comparisonMethod
    }
}

export const ADD_SET = 'customers_activity/add_set'
export const addSet = (baseSetTitle: string): PayloadAction<string> => {
    return {
        type: ADD_SET,
        payload: baseSetTitle
    }
}

export const REMOVE_SET = 'customers_activity/remove_set'
export const removeSet = (title: string): PayloadAction<string> => {
    return {
        type: REMOVE_SET,
        payload: title
    }
}

export const CHANGE_TRIBES = 'customers_activity/change_tribes'
export const changeTribes = (tribes: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_TRIBES,
        payload: tribes
    }
}

export const CHANGE_CUSTOMERS_GROUPS = 'customers_activity/change_customers_groups'
export const changeCustomersGroups = (customersGroups: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_CUSTOMERS_GROUPS,
        payload: customersGroups
    }
}

export const CHANGE_TICKETS_TYPES = 'customers_activity/change_tickets_types'
export const changeTicketsTypes = (ticketsTypes: Payload<string, Array<number>>): PayloadAction<Payload<string, Array<number>>> => {
    return {
        type: CHANGE_TICKETS_TYPES,
        payload: ticketsTypes
    }
}

export const CHANGE_TICKETS_TAGS = 'customers_activity/change_tickets_tags'
export const changeTicketsTags = (ticketsTags: Payload<string, Array<number>>): PayloadAction<Payload<string, Array<number>>> => {
    return {
        type: CHANGE_TICKETS_TAGS,
        payload: ticketsTags
    }
}

export const CHANGE_REPLIES_TYPES = 'customers_activity/change_replies_types'
export const changeRepliesTypes = (repliesTypes: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_REPLIES_TYPES,
        payload: repliesTypes
    }
}

export const CHANGE_CONTROLS = 'customers_activity/change_controls'
export const changeControls = (repliesTypes: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_CONTROLS,
        payload: repliesTypes
    }
}

export const CHANGE_FEATURES = 'customers_activity/change_features'
export const changeFeatures = (repliesTypes: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_FEATURES,
        payload: repliesTypes
    }
}
