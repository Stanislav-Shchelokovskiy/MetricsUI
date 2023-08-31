import { PayloadAction } from '@reduxjs/toolkit'
import { PerformanceMetricsShareableStore } from './Store'
import { BaseContainerState, getDefaultBaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { getContainerReducer } from '../../common/store/multiset_container/ContainerReducerFactory'
import { containerValidator } from './StoreStateValidator'
import { Context } from '../../common/store/multiset_container/Context'

export const CONTEXT = Context.Performance

export interface ContainerState extends BaseContainerState { }

const INITIAL_CONTAINER_STATE: ContainerState = {
    ...getDefaultBaseContainerState(CONTEXT),
}

export const containerReducer = (state: ContainerState = INITIAL_CONTAINER_STATE, action: PayloadAction<any>): ContainerState => {
    let res = containerReducerDefault(state, action)
    return customOptionsReducer(res, action)
}

const containerReducerDefault = getContainerReducer<ContainerState, PerformanceMetricsShareableStore>(INITIAL_CONTAINER_STATE, containerValidator)

function customOptionsReducer(state: ContainerState, action: PayloadAction<any>): ContainerState {
    return state
}