import { PayloadAction } from '@reduxjs/toolkit'
import { CHANGE_CONTEXT } from '../../common/store/multiset_container/Actions'

export enum Context {
    Support=0,
    Cost=1,
}

interface ContainerState {
    context: Context
}

const INITIAL_STATE: ContainerState = {
    context: Context.Support
}

export function containerReducer(state: ContainerState = INITIAL_STATE, action: PayloadAction<any>): ContainerState {
    switch (action.type) {

        case CHANGE_CONTEXT:
            return {
                ...state,
                context: action.payload
            }

        default:
            return state
    }
}
