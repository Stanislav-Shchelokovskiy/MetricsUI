import { AnyAction } from '@reduxjs/toolkit'
import { CHANGE_REPLY_TYPE } from './Actions'
import { CHANGE_SELECTED_TENTS } from '../forecaster/Actions'
import { Forecast, filterTents, updateTentContainersStates } from '../Utils'


export interface TacticalForecast extends Forecast {
    replyType: string
}

export const INITIAL_STATE: TacticalForecast = {
    tentId: '',
    replyType: ''
}

export const tacticalForecastsReducer = (state: Array<TacticalForecast> = Array<TacticalForecast>(), action: AnyAction): Array<TacticalForecast> => {
    switch (action.type) {

        case CHANGE_SELECTED_TENTS:
            return filterTents(state, action, INITIAL_STATE)

        case CHANGE_REPLY_TYPE:
            return updateTentContainersStates(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    replyType: action.payload.data !== undefined ? action.payload.data : INITIAL_STATE.replyType
                }
            })

        default:
            return state
    }
}
