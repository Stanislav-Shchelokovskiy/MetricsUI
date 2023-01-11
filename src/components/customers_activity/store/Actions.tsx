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

export const CHANGE_PLATFORMS = 'customers_activity/change_platforms'
export const changePlatforms = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_PLATFORMS,
        payload: payload
    }
}

export const CHANGE_PLATFORMS_INCLUDE = 'customers_activity/change_platforms_include'
export const changePlatformsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_PLATFORMS_INCLUDE,
        payload: payload
    }
}

export const CHANGE_PRODUCTS = 'customers_activity/change_products'
export const changeProducts = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_PRODUCTS,
        payload: payload
    }
}

export const CHANGE_PRODUCTS_INCLUDE = 'customers_activity/change_products_include'
export const changeProductsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_PRODUCTS_INCLUDE,
        payload: payload
    }
}

export const CHANGE_POSITIONS = 'customers_activity/change_positions'
export const changePositions = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_POSITIONS,
        payload: payload
    }
}

export const CHANGE_POSITIONS_INCLUDE = 'customers_activity/change_positions_include'
export const changePositionsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_POSITIONS_INCLUDE,
        payload: payload
    }
}

export const CHANGE_EMP_TRIBES = 'customers_activity/change_emp_tribes'
export const changeEmpTribes = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_EMP_TRIBES,
        payload: payload
    }
}

export const CHANGE_EMP_TRIBES_INCLUDE = 'customers_activity/change_emp_tribes_include'
export const changeEmpTribesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_EMP_TRIBES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_EMPLOYEES = 'customers_activity/change_employees'
export const changeEmployees = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_EMPLOYEES,
        payload: payload
    }
}

export const CHANGE_EMPLOYEES_INCLUDE = 'customers_activity/change_employees_include'
export const changeEmployeesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_EMPLOYEES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_TRACKED_CUSTOMERS_GROUPS_MODE = 'customers_activity/change_tracked_customers_groups_mode'
export const changeTrackedCustomersGroupsMode = (payload: boolean): PayloadAction<boolean> => {
    return {
        type: CHANGE_TRACKED_CUSTOMERS_GROUPS_MODE,
        payload: payload
    }
}
