import { AnyAction } from '@reduxjs/toolkit'
import { generateNewSetTitle } from './sets_reducer/GeneralReducer'
import { getDefaultTitle } from './sets_reducer/Defaults'
import { APPLY_STATE } from '../../common/store/state/Actions'
import { validateCustomersActivityProperties } from './StoreStateValidator'
import { getValidComparisonMethodOrDefault } from '../common_settings_panel/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../common_settings_panel/MetricSelector'
import {
    CHANGE_PERIOD,
    CHANGE_GROUP_BY_PERIOD,
    CHANGE_METRIC,
    CHANGE_COMPARISON_METHOD,
    ADD_SET,
    REMOVE_SET,
    CHANGE_SET_TITLE,
    CHANGE_BASELINE_ALIGNED_MODE,
    HIDE_LEGENDS,
} from './actions/Common'


export interface CustomersActivityState {
    range: Array<string>
    groupByPeriod: string
    metric: string
    comparisonMethod: string
    baselineAlignedModeEnabled: boolean
    sets: Array<string>
    hiddenLegends: Array<string>
}


const INITIAL_CUSTOMERS_ACTIVITY_STATE: CustomersActivityState = {
    range: Array<string>(),
    groupByPeriod: '',
    metric: getValidMetricOrDefault(undefined),
    comparisonMethod: getValidComparisonMethodOrDefault(undefined),
    baselineAlignedModeEnabled: false,
    sets: [getDefaultTitle()],
    hiddenLegends: Array<string>()
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
                groupByPeriod: action.payload !== undefined ? action.payload : INITIAL_CUSTOMERS_ACTIVITY_STATE.groupByPeriod
            }

        case CHANGE_METRIC:
            return {
                ...state,
                metric: action.payload !== undefined ? action.payload : INITIAL_CUSTOMERS_ACTIVITY_STATE.metric
            }

        case CHANGE_COMPARISON_METHOD:
            return {
                ...state,
                comparisonMethod: action.payload !== undefined ? action.payload : INITIAL_CUSTOMERS_ACTIVITY_STATE.comparisonMethod
            }

        case ADD_SET:
            return {
                ...state,
                sets: [...state.sets, generateNewSetTitle(state.sets)]
            }

        case REMOVE_SET:
            const remove_selector = (x: string) => x !== action.payload
            return {
                ...state,
                sets: state.sets.length < 2 ? [getDefaultTitle()] : state.sets.filter(remove_selector),
                hiddenLegends: state.hiddenLegends.filter(remove_selector)
            }

        case APPLY_STATE:
            return validateCustomersActivityProperties(action.payload.customersActivity)

        case CHANGE_SET_TITLE:
            const replace_selector = (x: string) => x !== action.payload.stateId ? x : action.payload.data
            return {
                ...state,
                sets: state.sets.map(replace_selector),
                hiddenLegends: state.hiddenLegends.map(replace_selector)
            }

        case CHANGE_BASELINE_ALIGNED_MODE:
            return {
                ...state,
                baselineAlignedModeEnabled: action.payload
            }

        case HIDE_LEGENDS:
            return {
                ...state,
                hiddenLegends: action.payload
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
