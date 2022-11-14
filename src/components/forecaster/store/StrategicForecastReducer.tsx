import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { TribeContainerState } from './Interfaces'
import { INITIAL_TRIBE_CONTAINER_STATE } from './InitialStates'


const CHANGE_FORECAST_HORIZON = 'strategic_forecast/change_forecast_horizon'
export const changeForecastHorizon = (forecastHorizon: string): PayloadAction<string> => {
    return {
        type: CHANGE_FORECAST_HORIZON,
        payload: forecastHorizon
    }
}

const CHANGE_TILE = 'strategic_forecast/change_tile'
export const changeTile = (tile: number): PayloadAction<number> => {
    return {
        type: CHANGE_TILE,
        payload: tile
    }
}

const CHANGE_POSITIONS_FILTER = 'strategic_forecast/change_positions_filter'
export const changePositionsFilter = (positionsFilter: Array<string>): PayloadAction<Array<string>> => {
    return {
        type: CHANGE_POSITIONS_FILTER,
        payload: positionsFilter
    }
}

const CHANGE_LEGENDS = 'strategic_forecast/change_legends'
export const legendClick = (legendsOnlyLegends: Array<string>): PayloadAction<Array<string>> => {
    return {
        type: CHANGE_LEGENDS,
        payload: legendsOnlyLegends
    }
}

export const StrategicForecastReducer = (state: TribeContainerState = INITIAL_TRIBE_CONTAINER_STATE, action: AnyAction): TribeContainerState => {
    switch (action.type) {
        case CHANGE_FORECAST_HORIZON:
            const forecastHorizon = action.payload
            return {
                ...state,
                strategicForecastState: {
                    ...state.strategicForecastState,
                    forecastHorizon: forecastHorizon
                }
            }
        case CHANGE_TILE:
            const tile = action.payload
            return {
                ...state,
                strategicForecastState: {
                    ...state.strategicForecastState,
                    tile: tile
                }
            }
        case CHANGE_POSITIONS_FILTER:
            const positionsFilter = action.payload
            return {
                ...state,
                strategicForecastState: {
                    ...state.strategicForecastState,
                    positionsFilter: positionsFilter
                }
            }
        case CHANGE_LEGENDS:
            const legendsOnlyLegends = action.payload
            return {
                ...state,
                strategicForecastState: {
                    ...state.strategicForecastState,
                    legendsOnlyLegends: legendsOnlyLegends
                }
            }
        default:
            return state
    }
}