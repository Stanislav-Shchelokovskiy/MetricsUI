import { PayloadAction } from '@reduxjs/toolkit'
import { BaseContainerState, getDefaultBaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { SupportMetricsShareableStore } from './Store'
import { containerValidator } from './StoreStateValidator'
import { getContainerReducer } from '../../common/store/multiset_container/ContainerReducerFactory'
import { CHANGE_BASELINE_ALIGNED_MODE } from './actions/Common'


export interface ContainerState extends BaseContainerState {
    baselineAlignedModeEnabled: boolean
}

const INITIAL_STATE: ContainerState = {
    ...getDefaultBaseContainerState(),
    baselineAlignedModeEnabled: false,
}

export function containerReducer(state: ContainerState = INITIAL_STATE, action: PayloadAction<any>): ContainerState {
    let res = containerReducerDefault(state, action)
    return customOptionsReducer(res, action)
}

const containerReducerDefault = getContainerReducer<ContainerState, SupportMetricsShareableStore>(INITIAL_STATE, containerValidator)

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
