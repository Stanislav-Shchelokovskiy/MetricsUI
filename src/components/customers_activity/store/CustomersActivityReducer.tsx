import { AnyAction } from '@reduxjs/toolkit'
import { getDefaultTitle } from '../../common/store/set_container/sets/Defaults'
import { validateCustomersActivityProperties } from './StoreStateValidator'
import { getHiddenLegendsReducer, getSetsReducer } from '../../common/store/set_container/ContainerReducer'
import { getStateReducer } from '../../common/store/set_container/ContainerReducer'
import { getValidComparisonMethodOrDefault } from '../common_settings_panel/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../common_settings_panel/MetricSelector'
import {
    CHANGE_PERIOD,
    CHANGE_GROUP_BY_PERIOD,
    CHANGE_METRIC,
    CHANGE_COMPARISON_METHOD,
    CHANGE_BASELINE_ALIGNED_MODE,
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
    groupByPeriod: 'takeFromValues',
    metric: getValidMetricOrDefault(undefined),
    comparisonMethod: getValidComparisonMethodOrDefault(undefined),
    baselineAlignedModeEnabled: false,
    sets: [getDefaultTitle()],
    hiddenLegends: Array<string>()
}


export const CustomersActivityReducer = (state: CustomersActivityState = INITIAL_CUSTOMERS_ACTIVITY_STATE, action: AnyAction): CustomersActivityState => {
    let res = setsReducer(state, action)
    res = hiddenLegendsReducer(res, action)
    res = stateReducer(res, action)
    return customersActivityReducer(res, action)
}

const setsReducer = getSetsReducer<CustomersActivityState>(INITIAL_CUSTOMERS_ACTIVITY_STATE)
const hiddenLegendsReducer = getHiddenLegendsReducer<CustomersActivityState>()
const stateReducer = getStateReducer<CustomersActivityState>(validateCustomersActivityProperties)

function customersActivityReducer(state: CustomersActivityState, action: AnyAction): CustomersActivityState {
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

        case CHANGE_BASELINE_ALIGNED_MODE:
            return {
                ...state,
                baselineAlignedModeEnabled: action.payload
            }

        default:
            return state
    }
}
