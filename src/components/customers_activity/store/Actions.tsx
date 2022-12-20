import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../common/Interfaces'

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

export const CHANGE_REPLIES_TYPES = 'customers_activity/change_replies_types'
export const changeRepliesTypes = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_REPLIES_TYPES,
        payload: payload
    }
}

export const CHANGE_REPLIES_TYPES_INCLUDE = 'customers_activity/change_replies_types_include'
export const changeRepliesTypesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_REPLIES_TYPES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_COMPONENTS = 'customers_activity/change_components'
export const changeComponents = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_COMPONENTS,
        payload: payload
    }
}

export const CHANGE_COMPONENTS_INCLUDE = 'customers_activity/change_components_include'
export const changeComponentsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_COMPONENTS_INCLUDE,
        payload: payload
    }
}

export const CHANGE_FEATURES = 'customers_activity/change_features'
export const changeFeatures = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_FEATURES,
        payload: payload
    }
}

export const CHANGE_FEATURES_INCLUDE = 'customers_activity/change_features_include'
export const changeFeaturesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_FEATURES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_SET_TITLE = 'customers_activity/change_set_title'
export const changeSetTitle = (payload: Payload<string, string>): PayloadAction<Payload<string, string>> => {
    return {
        type: CHANGE_SET_TITLE,
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
