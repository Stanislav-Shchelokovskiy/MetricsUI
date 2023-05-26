import { PayloadAction } from '@reduxjs/toolkit'
import { CostMetricsShareableStore } from './Store'
import { BaseContainerState } from '../../common/store/multiset_container/Interfaces'
import { getDefaultTitle } from '../../common/store/multiset_container/sets/Defaults'
import { getContainerReducer } from '../../common/store/multiset_container/ContainerReducerFactory'
import { containerValidator } from './StoreStateValidator'
import { getValidComparisonMethodOrDefault } from '../../common/components/multiset_container/graph/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../../common/components/multiset_container/graph/MetricSelector'


export interface ContainerState extends BaseContainerState { }

const INITIAL_CONTAINER_STATE: ContainerState = {
    range: Array<string>(),
    groupByPeriod: 'takeFromValues',
    metric: getValidMetricOrDefault(undefined),
    comparisonMethod: getValidComparisonMethodOrDefault(undefined),
    sets: [getDefaultTitle()],
    hiddenLegends: Array<string>()
}

export const containerReducer = (state: ContainerState = INITIAL_CONTAINER_STATE, action: PayloadAction<any>): ContainerState => {
    let res = containerReducerDefault(state, action)
    return customOptionsReducer(res, action)
}

const containerReducerDefault = getContainerReducer<ContainerState, CostMetricsShareableStore>(INITIAL_CONTAINER_STATE, containerValidator)

function customOptionsReducer(state: ContainerState, action: PayloadAction<any>): ContainerState {
    return state
}
