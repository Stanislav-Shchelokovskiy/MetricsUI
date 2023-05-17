import { AnyAction } from '@reduxjs/toolkit'
import { Tribe } from '../../common/Interfaces'
import {
    CHANGE_INCOME_TYPE,
    CHANGE_SELECTED_TRIBES,
    CHANGE_LAST_UPDATED
} from './Actions'


export interface ForecasterState {
    incomeType: string
    tribes: Array<Tribe>
    lastUpdated: number
}


const INITIAL_FORECASTER_STATE: ForecasterState = {
    incomeType: '',
    tribes: Array<Tribe>(),
    lastUpdated: Date.now()
}


export const ForecasterReducer = (state: ForecasterState = INITIAL_FORECASTER_STATE, action: AnyAction): ForecasterState => {
    switch (action.type) {
        case CHANGE_INCOME_TYPE:
            return {
                ...state,
                incomeType: action.payload !== undefined ? action.payload : INITIAL_FORECASTER_STATE.incomeType
            }
        case CHANGE_SELECTED_TRIBES:
            return {
                ...state,
                tribes: action.payload
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
