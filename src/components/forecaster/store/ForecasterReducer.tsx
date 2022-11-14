import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { Tribe } from "../Tribe"
import { ForecasterState } from './Interfcaces'
import { INITIAL_FORECASTER_STATE } from './InitialStates'


const CHANGE_INCOME_TYPE = 'forecaster/change_income_type'
export const changeIncomeType = (incomeType: string): PayloadAction<string> => {
    return {
        type: CHANGE_INCOME_TYPE,
        payload: incomeType
    }
}

const CHANGE_SELECTED_TRIBES = 'forecaster/change_selected_tribes'
export const changeSelectedTribes = (selectedTribes: Array<Tribe>): PayloadAction<Array<Tribe>> => {
    return {
        type: CHANGE_SELECTED_TRIBES,
        payload: selectedTribes
    }
}

const CHANGE_LAST_UPDATED = 'forecaster/change_last_updated'
export const changeLastUpdated = (): PayloadAction<number> => {
    return {
        type: CHANGE_LAST_UPDATED,
        payload: Date.now()
    }
}


export const ForecasterReducer = (state: ForecasterState = INITIAL_FORECASTER_STATE, action: AnyAction): ForecasterState => {
    switch (action.type) {
        case CHANGE_INCOME_TYPE:
            const incomeType = action.payload
            return {
                ...state,
                incomeType: incomeType,
                currentTribeContainersStates: state.currentTribeContainersStates.map((x) => { return { ...x, incomeType: incomeType } })
            }
        case CHANGE_LAST_UPDATED:
            const lastUpdated = action.payload
            return {
                ...state,
                lastUpdated: lastUpdated,
                currentTribeContainersStates: state.currentTribeContainersStates.map((x) => { return { ...x, lastUpdated: lastUpdated } })
            }
        case CHANGE_SELECTED_TRIBES:
            const selectedTribes = action.payload
            return {
                ...state,
                selectedTribes: selectedTribes
            }
        default:
            return state
    }
}