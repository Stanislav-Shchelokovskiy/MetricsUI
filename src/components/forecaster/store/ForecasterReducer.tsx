import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { Tribe } from "../Tribe"

export interface ForecasterState {
    incomeType: string
    selectedTribes: Array<Tribe>
}

const CHANGE_INCOME_TYPE = 'forecaster/change_income_type'
export const forecasterChangeIncomeType = (incomeType: string): PayloadAction<string> => {
    return {
        type: CHANGE_INCOME_TYPE,
        payload: incomeType
    }
}

const CHANGE_SELECTED_TRIBES = 'forecaster/change_selected_tribes'
export const forecasterChangeSelectedTribes = (selectedTribes: Array<Tribe>): PayloadAction<Array<Tribe>> => {
    return {
        type: CHANGE_SELECTED_TRIBES,
        payload: selectedTribes
    }
}

const INITIAL_FORECASTER_STATE: ForecasterState = {
    incomeType: '',
    selectedTribes: Array<Tribe>()
}


export const ForecasterReducer = (state: ForecasterState = INITIAL_FORECASTER_STATE, action: AnyAction): ForecasterState => {
    switch (action.type) {
        case CHANGE_INCOME_TYPE:
            return {
                ...state,
                incomeType: action.payload
            }
        case CHANGE_SELECTED_TRIBES:
            return {
                ...state,
                selectedTribes: action.payload
            }
        default:
            return state
    }
}