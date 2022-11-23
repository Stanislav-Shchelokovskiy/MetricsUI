import { PayloadAction } from '@reduxjs/toolkit'

interface Payload<T> {
    tribeId: string
    data: T
}

export const CHANGE_PERIOD = 'customers_activity/change_period'
export const changePeriod = (period: Array<Date>): PayloadAction<Array<string>> => {
    return {
        type: CHANGE_PERIOD,
        payload: period.map(x=>x.toISOString().slice(0,10))
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
