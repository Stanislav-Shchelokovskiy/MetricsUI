import { AnyAction } from '@reduxjs/toolkit'
import {
    CHANGE_PERIOD,
    CHANGE_GROUP_BY_PERIOD,
    CHANGE_METRIC,
    ADD_SET,
    REMOVE_SET,
} from './Actions'
import { GenerateNewSetTitle } from './SetsReducer'
import { INITIAL_SET_STATE } from '../store/SetsReducer'


export interface CustomersActivityState {
    range: Array<string>
    groupByPeriod: string
    metric: string
    sets: Array<string>
}

const INITIAL_CUSTOMERS_ACTIVITY_STATE: CustomersActivityState = {
    range: Array<string>(),
    groupByPeriod: '',
    metric: '',
    sets: [INITIAL_SET_STATE.title]
}


export const CustomersActivityReducer = (state: CustomersActivityState = INITIAL_CUSTOMERS_ACTIVITY_STATE, action: AnyAction): CustomersActivityState => {
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

        case ADD_SET:
            return {
                ...state,
                sets: [...state.sets, GenerateNewSetTitle(state.sets)]
            }
            
        case REMOVE_SET:
            return {
                ...state,
                sets: state.sets.filter(set => set !== action.payload)
            }

        default:
            if (state.sets.length === 0) {
                return {
                    ...state,
                    sets: INITIAL_CUSTOMERS_ACTIVITY_STATE.sets
                }
            }
            return state
    }
}
