import { AnyAction } from '@reduxjs/toolkit'
import {
    CHANGE_FORECAST_HORIZON,
    CHANGE_TILE,
    CHANGE_POSITIONS_FILTER,
    CHANGE_LEGENDS,
} from './Actions'
import { CHANGE_SELECTED_TENTS } from '../forecaster/Actions'
import { Forecast, filterTents, updateTentContainersStates } from '../Utils'


export interface StrategicForecast extends Forecast {
    forecastHorizon: string
    tile: number
    positions: Array<string>
    legendsOnlyLegends: Array<string>
}

export const INITIAL_STATE: StrategicForecast = {
    tentId: '',
    forecastHorizon: '',
    tile: 4,
    positions: Array<string>(),
    legendsOnlyLegends: Array<string>()
}


export const strategicForecastsReducer = (state: Array<StrategicForecast> = Array<StrategicForecast>(), action: AnyAction): Array<StrategicForecast> => {
    switch (action.type) {

        case CHANGE_SELECTED_TENTS:
            return filterTents(state, action, INITIAL_STATE)

        case CHANGE_FORECAST_HORIZON:
            return updateTentContainersStates(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    forecastHorizon: action.payload.data !== undefined ? action.payload.data : INITIAL_STATE.forecastHorizon
                }
            })

        case CHANGE_TILE:
            return updateTentContainersStates(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    tile: action.payload.data !== undefined ? action.payload.data : INITIAL_STATE.tile
                }
            })

        case CHANGE_POSITIONS_FILTER:
            return updateTentContainersStates(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    positions: action.payload.data
                }
            })

        case CHANGE_LEGENDS:
            return updateTentContainersStates(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    legendsOnlyLegends: action.payload.data
                }
            })

        default:
            return state
    }
}
