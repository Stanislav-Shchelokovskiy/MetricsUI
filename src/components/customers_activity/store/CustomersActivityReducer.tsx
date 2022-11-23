import { AnyAction } from '@reduxjs/toolkit'
import {
    CHANGE_PERIOD,
    CHANGE_GROUP_BY_PERIOD,
    CHANGE_METRIC,
} from './Actions'


export interface CustomersActivityState {
    range: Array<string>
    groupByPeriod: string
    metric: string
}

const INITIAL_STATE: CustomersActivityState = {
    range: Array<string>(),
    groupByPeriod: '',
    metric: ''
}


export const CustomersActivityReducer = (state: CustomersActivityState = INITIAL_STATE, action: AnyAction): CustomersActivityState => {
    switch (action.type) {
        case CHANGE_PERIOD:
            return {
                ...state,
                range: action.payload
            }
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
