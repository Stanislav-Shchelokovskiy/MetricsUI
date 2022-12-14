import { AnyAction } from '@reduxjs/toolkit'
import { ADD_STATE_KEY, CHANGE_STATE_KEY } from './Actions'

export interface ViewState {
    key: string
    stateKeys: Array<string>
}

const INITIAL_VIEW_STATE: ViewState = {
    key: '',
    stateKeys: []
}

export const ViewStateReducer = (state: ViewState = INITIAL_VIEW_STATE, action: AnyAction): ViewState => {
    switch (action.type) {

        case CHANGE_STATE_KEY:
            return {
                ...state,
                key: action.payload
            }

        case ADD_STATE_KEY:
            return {
                ...state,
                stateKeys: [...state.stateKeys, action.payload]
            }

        default:
            return state
    }
}