import { PayloadAction } from '@reduxjs/toolkit'
import { NonShareableState, INITIAL_STATE } from './NonShareableState'
import { UPDATE_FAVORITE_METRICS } from './Actions'


export function nonShareableReducer(state: NonShareableState = INITIAL_STATE, action: PayloadAction<any>): NonShareableState {
    switch (action.type) {
        case UPDATE_FAVORITE_METRICS:
            return {
                ...state,
                favoriteMetrics: action.payload
            }
        default:
            return state
    }
}
