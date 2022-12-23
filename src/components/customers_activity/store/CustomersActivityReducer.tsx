import { AnyAction } from '@reduxjs/toolkit'
import { GenerateNewSetTitle } from './SetsReducer'
import { INITIAL_SET } from '../store/SetsReducer'
import { APPLY_STATE } from '../../common/store/state/Actions'
import {
    CHANGE_PERIOD,
    CHANGE_GROUP_BY_PERIOD,
    CHANGE_METRIC,
    CHANGE_COMPARISON_METHOD,
    ADD_SET,
    REMOVE_SET,
    CHANGE_SET_TITLE,
} from './Actions'


export interface CustomersActivityState {
    range: Array<string>
    groupByPeriod: string
    metric: string
    comparisonMethod: string
    sets: Array<string>
}


const INITIAL_CUSTOMERS_ACTIVITY_STATE: CustomersActivityState = {
    range: Array<string>(),
    groupByPeriod: '',
    metric: '',
    comparisonMethod: '',
    sets: [INITIAL_SET.title]
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

        case CHANGE_COMPARISON_METHOD:
            return {
                ...state,
                comparisonMethod: action.payload
            }

        case ADD_SET:
            return {
                ...state,
                sets: [...state.sets, GenerateNewSetTitle(state.sets)]
            }

        case REMOVE_SET:
            return {
                ...state,
                sets: state.sets.length < 2 ? [INITIAL_SET.title] : state.sets.filter(set => set !== action.payload)
            }

        case APPLY_STATE:
            return action.payload.customersActivity

        case CHANGE_SET_TITLE:
            return {
                ...state,
                sets: state.sets.map(set => set !== action.payload.stateId ? set : action.payload.data)
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
