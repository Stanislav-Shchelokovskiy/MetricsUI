import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { ForecasterState, Payload, TribeContainerState } from './Interfaces'
import { INITIAL_FORECASTER_STATE } from './InitialStates'
import updateTribeContainersStates from './UpdateTribeContainersStates'


const CHANGE_FORECAST_HORIZON = 'strategic_forecast/change_forecast_horizon'
export const changeForecastHorizon = (forecastHorizon: Payload<string>): PayloadAction<Payload<string>> => {
    return {
        type: CHANGE_FORECAST_HORIZON,
        payload: forecastHorizon
    }
}

const CHANGE_TILE = 'strategic_forecast/change_tile'
export const changeTile = (tile: Payload<number>): PayloadAction<Payload<number>> => {
    return {
        type: CHANGE_TILE,
        payload: tile
    }
}

const CHANGE_POSITIONS_FILTER = 'strategic_forecast/change_positions_filter'
export const changePositionsFilter = (positionsFilter: Payload<Array<string>>): PayloadAction<Payload<Array<string>>> => {
    return {
        type: CHANGE_POSITIONS_FILTER,
        payload: positionsFilter
    }
}

const CHANGE_LEGENDS = 'strategic_forecast/change_legends'
export const legendClick = (legendsOnlyLegends: Payload<Array<string>>): PayloadAction<Payload<Array<string>>> => {
    return {
        type: CHANGE_LEGENDS,
        payload: legendsOnlyLegends
    }
}

export const StrategicForecastReducer = (state: ForecasterState = INITIAL_FORECASTER_STATE, action: AnyAction): ForecasterState => {
    switch (action.type) {
        case CHANGE_FORECAST_HORIZON:
            const forecastHorizonPayload: Payload<string> = action.payload
            return {
                ...state,
                currentTribeContainersStates: updateTribeContainersStates(
                    forecastHorizonPayload.tribeId,
                    state.currentTribeContainersStates,
                    (currState: TribeContainerState) => {
                        return {
                            ...currState,
                            strategicForecastState: {
                                ...currState.strategicForecastState,
                                forecastHorizon: forecastHorizonPayload.data
                            }
                        }
                    }
                )
            }
        case CHANGE_TILE:
            const tilePayload: Payload<number> = action.payload
            return {
                ...state,
                currentTribeContainersStates: updateTribeContainersStates(
                    tilePayload.tribeId,
                    state.currentTribeContainersStates,
                    (currState: TribeContainerState) => {
                        return {
                            ...currState,
                            strategicForecastState: {
                                ...currState.strategicForecastState,
                                tile: tilePayload.data
                            }
                        }
                    }
                )
            }
        case CHANGE_POSITIONS_FILTER:
            const positionsFilterPayload: Payload<Array<string>> = action.payload
            return {
                ...state,
                currentTribeContainersStates: updateTribeContainersStates(
                    positionsFilterPayload.tribeId,
                    state.currentTribeContainersStates,
                    (currState: TribeContainerState) => {
                        return {
                            ...currState,
                            strategicForecastState: {
                                ...currState.strategicForecastState,
                                positionsFilter: positionsFilterPayload.data
                            }
                        }
                    }
                )
            }
        case CHANGE_LEGENDS:
            const legendsOnlyLegendsPayload: Payload<Array<string>> = action.payload
            return {
                ...state,
                currentTribeContainersStates: updateTribeContainersStates(
                    legendsOnlyLegendsPayload.tribeId,
                    state.currentTribeContainersStates,
                    (currState: TribeContainerState) => {
                        return {
                            ...currState,
                            strategicForecastState: {
                                ...currState.strategicForecastState,
                                legendsOnlyLegends: legendsOnlyLegendsPayload.data
                            }
                        }
                    }
                )
            }
        default:
            return state
    }
}