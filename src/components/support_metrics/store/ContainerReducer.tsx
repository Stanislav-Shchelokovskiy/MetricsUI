import { PayloadAction } from '@reduxjs/toolkit'
import { BaseContainerState, getDefaultBaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { containerValidator } from './StoreStateValidator'
import { getContainerReducer } from '../../common/store/multiset_container/ContainerReducerFactory'
import { CHANGE_BASELINE_ALIGNED_MODE } from './actions/Common'
import { Context } from '../../common/store/multiset_container/Context'

export const CONTEXT = Context.Support

export interface ContainerState extends BaseContainerState {
    baselineAlignedModeEnabled: boolean
}

export const INITIAL_STATE: ContainerState = {
    ...getDefaultBaseContainerState(CONTEXT),
    baselineAlignedModeEnabled: false,
}

export function containerReducer(state: ContainerState = INITIAL_STATE, action: PayloadAction<any>): ContainerState {
    let res = containerReducerDefault(state, action)
    return customReducer(res, action)
}

const containerReducerDefault = getContainerReducer<ContainerState>(INITIAL_STATE, containerValidator)

function customReducer(state: ContainerState, action: PayloadAction<any>): ContainerState {
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
