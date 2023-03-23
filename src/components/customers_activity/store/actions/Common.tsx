import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'

export const CHANGE_PERIOD = 'customers_activity/change_period'
export const changePeriod = (period: Array<string>): PayloadAction<Array<string>> => {
    return {
        type: CHANGE_PERIOD,
        payload: period
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

export const CHANGE_SET_TITLE = 'customers_activity/change_set_title'
export const changeSetTitle = (payload: Payload<string, string>): PayloadAction<Payload<string, string>> => {
    return {
        type: CHANGE_SET_TITLE,
        payload: payload
    }
}

export const CHANGE_BASELINE_ALIGNED_MODE = 'customers_activity/change_baseline_aligned_mode'
export const changeBaselineAlignedMode = (payload: boolean): PayloadAction<boolean> => {
    return {
        type: CHANGE_BASELINE_ALIGNED_MODE,
        payload: payload
    }
}
