import { PayloadAction } from '@reduxjs/toolkit'
import { BaseContainerState, getDefaultBaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { containerValidator } from './StoreStateValidator'
import { getContainerReducer } from '../../common/store/multiset_container/ContainerReducerFactory'
import { Context } from '../../common/store/multiset_container/Context'

export const CONTEXT = Context.Support

export interface ContainerState extends BaseContainerState {}

export const INITIAL_STATE: ContainerState = {
    ...getDefaultBaseContainerState(CONTEXT),
}

export function containerReducer(state: ContainerState = INITIAL_STATE, action: PayloadAction<any>): ContainerState {
    let res = containerReducerDefault(state, action)
    return customReducer(res, action)
}

const containerReducerDefault = getContainerReducer<ContainerState>(INITIAL_STATE, containerValidator)

function customReducer(state: ContainerState, action: PayloadAction<any>): ContainerState {
    return state
}
