import { AnyAction } from '@reduxjs/toolkit'
import {
    CHANGE_GROUP_BY_PERIOD,
    CHANGE_METRIC,
} from './Actions'


export interface CustomersActivityState {
    groupByPeriod: string
    metric: string
}

const INITIAL_STATE: CustomersActivityState = {
    groupByPeriod: '',
    metric: ''
}


export const CustomersActivityReducer = (state: CustomersActivityState = INITIAL_STATE, action: AnyAction): CustomersActivityState => {
    switch (action.type) {
        case CHANGE_GROUP_BY_PERIOD:
            return {
                ...state,
                groupByPeriod: action.payload
            }
        case CHANGE_METRIC:
            return {
                ...state,
                metric: action.payload
            }
        default:
            return state
    }
}
