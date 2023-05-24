import { AnyAction, PayloadAction } from '@reduxjs/toolkit'
import { BaseSet } from './sets/Interfaces'
import { BaseContainerState } from './Interfaces'
import { APPLY_STATE } from '../state/Actions'

export function getViewStateReducer<StateT extends Array<BaseSet> | BaseContainerState, ShareableStateT>(stateValidator: (action: ShareableStateT) => StateT): (state: StateT, action: AnyAction) => StateT {
    return (state: StateT, action: AnyAction) => {
        switch (action.type) {

            case APPLY_STATE:
                return stateValidator((action as PayloadAction<ShareableStateT>).payload)

            default:
                return state
        }
    }
}
