import { AnyAction } from '@reduxjs/toolkit'
import { EXPAND_FORECAST_ITEMS } from './Actions'
import { CHANGE_SELECTED_TENTS } from '../forecaster/Actions'
import { Forecast, filterTents, updateTentContainersStates } from '../Utils'


export interface ForecasterItems extends Forecast {
    expandedItems: Array<string>
}

export const INITIAL_STATE = {
    tentId: '',
    expandedItems: Array<string>()
}

export const forecasterItemsReducer = (state: Array<ForecasterItems> = Array<ForecasterItems>(), action: AnyAction): Array<ForecasterItems> => {
    switch (action.type) {

        case CHANGE_SELECTED_TENTS:
            return filterTents(state, action, INITIAL_STATE)

        case EXPAND_FORECAST_ITEMS:
            return updateTentContainersStates(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    expandedItems: action.payload.data
                }
            })

        default:
            return state
    }
}
