import { AnyAction } from '@reduxjs/toolkit'
import { SELECT_FORECAST_ITEMS } from './Actions'

export const ForecasterItemsReducer = (state: Array<string> = Array<string>(), action: AnyAction): Array<string> => {
    switch (action.type) {
        case SELECT_FORECAST_ITEMS:
            return action.payload
        default:
            return state
    }
}