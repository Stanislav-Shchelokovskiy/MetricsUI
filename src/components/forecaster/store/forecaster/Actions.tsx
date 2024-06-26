import { PayloadAction } from '@reduxjs/toolkit'
import { Knot } from '../../../common/Typing'

export const CHANGE_SELECTED_TENTS = 'change_selected_tents'
export const changeSelectedTents = (selectedTribes: Array<Knot>): PayloadAction<Array<Knot>> => {
    return {
        type: CHANGE_SELECTED_TENTS,
        payload: selectedTribes
    }
}

export const CHANGE_INCOME_TYPE = 'forecaster/change_income_type'
export const changeIncomeType = (incomeType: string | undefined): PayloadAction<string | undefined> => {
    return {
        type: CHANGE_INCOME_TYPE,
        payload: incomeType
    }
}

export const CHANGE_LAST_UPDATED = 'forecaster/change_last_updated'
export const changeLastUpdated = (): PayloadAction<number> => {
    return {
        type: CHANGE_LAST_UPDATED,
        payload: Date.now()
    }
}
