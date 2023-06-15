import { PayloadAction } from '@reduxjs/toolkit'
import { BaseContainerState } from './BaseContainerState'
import { BaseSetState } from './sets/Interfaces'
import { APPLY_STATE } from '../view_state/Actions'

interface SetsState extends Array<BaseSetState> { }
interface ContainerState extends BaseContainerState { }
type BaseViewState = SetsState | ContainerState

export function getViewStateReducer<ViewStateT extends BaseViewState, ShareableStateT>(stateValidator: (state: ShareableStateT) => ViewStateT): (state: ViewStateT, action: PayloadAction<any>) => ViewStateT {
    return (state: ViewStateT, action: PayloadAction<any>) => {
        switch (action.type) {

            case APPLY_STATE:
                return stateValidator(action.payload)

            default:
                return state
        }
    }
}
