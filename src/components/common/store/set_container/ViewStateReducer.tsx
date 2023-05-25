import { AnyAction, PayloadAction } from '@reduxjs/toolkit'
import { BaseContainerState } from './Interfaces'
import { BaseSetState } from './sets/Interfaces'
import { APPLY_STATE } from '../state/Actions'

export function getViewStateReducer<StateT extends Array<BaseSetState> | BaseContainerState, ShareableStateT>(stateValidator: (action: ShareableStateT) => StateT): (state: StateT, action: AnyAction) => StateT {
    return (state: StateT, action: AnyAction) => {
        switch (action.type) {

            case APPLY_STATE:
                return stateValidator((action as PayloadAction<ShareableStateT>).payload)

            default:
                return state
        }
    }
}
