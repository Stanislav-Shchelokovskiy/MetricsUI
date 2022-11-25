import { AnyAction } from '@reduxjs/toolkit'
import { Tribe } from '../../common/Interfaces'
import {
    CHANGE_SELECTED_TRIBES,
} from './Actions'


export interface SetState {
    title: string
    selectedTribes: Array<Tribe>
}

export const INITIAL_SET_STATE: SetState = {
    title: '1',
    selectedTribes: Array<Tribe>()
}


export const SetReducer = (state: SetState = INITIAL_SET_STATE, action: AnyAction): SetState => {
    switch (action.type) {
        case CHANGE_SELECTED_TRIBES:
            return {
                ...state,
                selectedTribes: action.payload
            }
        default:
            return state
    }
}
