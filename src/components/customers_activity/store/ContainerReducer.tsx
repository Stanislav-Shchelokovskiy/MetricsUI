import { PayloadAction } from '@reduxjs/toolkit'
import { BaseContainerState } from '../../common/store/multiset_container/Interfaces'
import { CustomersActivityShareableStore } from './Store'
import { getDefaultTitle } from '../../common/store/multiset_container/sets/Defaults'
import { containerValidator } from './StoreStateValidator'
import { getContainerReducer } from '../../common/store/multiset_container/ContainerReducerFactory'
import { getValidComparisonMethodOrDefault } from '../../common/components/multiset_container/graph/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../../common/components/multiset_container/graph/MetricSelector'
import { CHANGE_BASELINE_ALIGNED_MODE } from './actions/Common'


export interface ContainerState extends BaseContainerState {
    baselineAlignedModeEnabled: boolean
}

const INITIAL_CUSTOMERS_ACTIVITY_STATE: ContainerState = {
    range: Array<string>(),
    groupByPeriod: 'takeFromValues',
    metric: getValidMetricOrDefault(undefined),
    comparisonMethod: getValidComparisonMethodOrDefault(undefined),
    baselineAlignedModeEnabled: false,
    sets: [getDefaultTitle()],
    hiddenLegends: Array<string>()
}

export function containerReducer(state: ContainerState = INITIAL_CUSTOMERS_ACTIVITY_STATE, action: PayloadAction<any>): ContainerState {
    let res = containerReducerDefault(state, action)
    return customOptionsReducer(res, action)
}

const containerReducerDefault = getContainerReducer<ContainerState, CustomersActivityShareableStore>(INITIAL_CUSTOMERS_ACTIVITY_STATE, containerValidator)

function customOptionsReducer(state: ContainerState, action: PayloadAction<any>): ContainerState {
    switch (action.type) {

        case CHANGE_BASELINE_ALIGNED_MODE:
            return {
                ...state,
                baselineAlignedModeEnabled: action.payload
            }

        default:
            return state
    }
}
