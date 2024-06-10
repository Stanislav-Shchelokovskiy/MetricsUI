import { AnyAction } from '@reduxjs/toolkit'
import { Knot } from '../../../common/Typing'
import {
    CHANGE_INCOME_TYPE,
    CHANGE_SELECTED_TENTS,
    CHANGE_LAST_UPDATED
} from './Actions'


export interface Forecaster {
    incomeType: string
    tents: Array<Knot>
    lastUpdated: number
}


export const INITIAL_STATE: Forecaster = {
    incomeType: '',
    tents: Array<Knot>(),
    lastUpdated: Date.now()
}


export const ForecasterReducer = (state: Forecaster = INITIAL_STATE, action: AnyAction): Forecaster => {
    switch (action.type) {
        case CHANGE_INCOME_TYPE:
            return {
                ...state,
                incomeType: action.payload !== undefined ? action.payload : INITIAL_STATE.incomeType
            }
        case CHANGE_SELECTED_TENTS:
            return {
                ...state,
                tents: action.payload
            }
        case CHANGE_LAST_UPDATED:
            return {
                ...state,
                lastUpdated: action.payload
            }
        default:
            return state
    }
}
