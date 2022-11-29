import { PayloadAction } from '@reduxjs/toolkit'
import { Tribe } from '../../common/Interfaces'
import { CustomersGroup } from '../network_resource_fetcher/FetchCustomersGroups'
import { TicketsType } from '../network_resource_fetcher/FetchTicketsTypes'
import { TicketsTag } from '../network_resource_fetcher/FetchTicketsTags'

interface Payload<T> {
    title: string
    data: T
}

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

export const CHANGE_SELECTED_TRIBES = 'customers_activity/change_selected_tribes'
export const changeSelectedTribes = (selectedTribes: Payload<Array<Tribe>>): PayloadAction<Payload<Array<Tribe>>> => {
    return {
        type: CHANGE_SELECTED_TRIBES,
        payload: selectedTribes
    }
}

export const CHANGE_SELECTED_CUSTOMERS_GROUPS = 'customers_activity/change_selected_customers_groups'
export const changeSelectedCustomersGroups = (selectedCustomersGroups: Payload<Array<CustomersGroup>>): PayloadAction<Payload<Array<CustomersGroup>>> => {
    return {
        type: CHANGE_SELECTED_CUSTOMERS_GROUPS,
        payload: selectedCustomersGroups
    }
}

export const CHANGE_SELECTED_TICKETS_TYPES = 'customers_activity/change_selected_tickets_types'
export const changeSelectedTicketsTypes = (selectedTicketsTypes: Payload<Array<TicketsType>>): PayloadAction<Payload<Array<TicketsType>>> => {
    return {
        type: CHANGE_SELECTED_TICKETS_TYPES,
        payload: selectedTicketsTypes
    }
}

export const CHANGE_SELECTED_TICKETS_TAGS = 'customers_activity/change_selected_tickets_tags'
export const changeSelectedTicketsTags = (selectedTicketsTags: Payload<Array<TicketsTag>>): PayloadAction<Payload<Array<TicketsTag>>> => {
    return {
        type: CHANGE_SELECTED_TICKETS_TAGS,
        payload: selectedTicketsTags
    }
}
