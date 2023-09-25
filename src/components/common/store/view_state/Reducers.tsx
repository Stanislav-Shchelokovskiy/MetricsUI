import { AnyAction } from '@reduxjs/toolkit'
import { REGISTER_STATE, DROP_STATE, CHANGE_STATE, CHANGE_VERSION, } from './Actions'

export interface ViewState {
    key: string
    salt: string
    stateKeys: Array<string>
    version: string
}

export function getViewStateReducer(stateSalt: string) {
    const initialState: ViewState = {
        key: '',
        salt: stateSalt,
        stateKeys: [],
        version: '0',
    }
    return (state: ViewState = initialState, action: AnyAction): ViewState => {
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
                    ...state,
                    key: state.key === action.payload ? '' : state.key,
                    stateKeys: state.stateKeys.filter(x => x !== action.payload)
                }

            case CHANGE_VERSION:
                return {
                    ...state,
                    version: action.payload
                }

            default:
                return state
        }
    }
}
