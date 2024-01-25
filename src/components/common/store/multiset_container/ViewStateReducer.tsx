import { PayloadAction } from '@reduxjs/toolkit'
import { APPLY_STATE } from '../view_state/Actions'
import { VALIDATE_STATE } from './Actions'
import { MultisetContainerStore } from './Store'


export function getViewStateReducer<T>(
    stateValidator: (newState: T, currentState?: T) => T,
    stateSelector: (state: MultisetContainerStore) => T,
): (state: T, action: PayloadAction<MultisetContainerStore>) => T {
    return (state: T, action: PayloadAction<MultisetContainerStore>) => {
        switch (action.type) {

            case APPLY_STATE:
                return stateValidator(stateSelector(action.payload), state)

            case VALIDATE_STATE:
                return stateValidator(state)

            default:
                return state
        }
    }
}
