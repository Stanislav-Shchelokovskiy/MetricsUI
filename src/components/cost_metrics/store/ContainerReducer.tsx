import { PayloadAction } from '@reduxjs/toolkit'
import { CostMetricsShareableStore } from './Store'
import { BaseContainerState, getDefaultBaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { getContainerReducer } from '../../common/store/multiset_container/ContainerReducerFactory'
import { containerValidator } from './StoreStateValidator'
import { getValidAggByOrDefault } from '../AggBySelector'
import { CHANGE_AGG_BY } from './Actions'


export interface ContainerState extends BaseContainerState {
    aggBy: string
}

const INITIAL_CONTAINER_STATE: ContainerState = {
    ...getDefaultBaseContainerState(),
    aggBy: getValidAggByOrDefault(undefined),
}

export const containerReducer = (state: ContainerState = INITIAL_CONTAINER_STATE, action: PayloadAction<any>): ContainerState => {
    let res = containerReducerDefault(state, action)
    return customOptionsReducer(res, action)
}

const containerReducerDefault = getContainerReducer<ContainerState, CostMetricsShareableStore>(INITIAL_CONTAINER_STATE, containerValidator)

function customOptionsReducer(state: ContainerState, action: PayloadAction<any>): ContainerState {
    switch (action.type) {
        case CHANGE_AGG_BY:
            return {
                ...state,
                aggBy: action.payload
            }
        default:
            return state
    }
}
