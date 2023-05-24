import { AnyAction } from '@reduxjs/toolkit'
import { REGISTER_STATE, DROP_STATE, CHANGE_STATE } from './Actions'

export interface ViewState {
    key: string
    stateKeys: Array<string>
}

export interface ViewStateStore {
    viewState: ViewState
}

const INITIAL_VIEW_STATE: ViewState = {
    key: '',
    stateKeys: []
}

export function ViewStateReducer(state: ViewState = INITIAL_VIEW_STATE, action: AnyAction): ViewState {
    switch (action.type) {

        case CHANGE_STATE:
            return {
                ...state,
                key: action.payload
            }

        case REGISTER_STATE:
            if (state.stateKeys.find(x => x === action.payload) !== undefined)
                return state
            return {
                ...state,
                stateKeys: [...state.stateKeys, action.payload]
            }

        case DROP_STATE:
            return {
                key: state.key === action.payload ? '' : state.key,
                stateKeys: state.stateKeys.filter(x => x !== action.payload)
            }

        default:
            return state
    }
}
