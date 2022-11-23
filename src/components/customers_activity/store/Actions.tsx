import { PayloadAction } from '@reduxjs/toolkit'

interface Payload<T> {
    tribeId: string
    data: T
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