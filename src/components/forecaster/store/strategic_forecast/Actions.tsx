import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'

export const CHANGE_FORECAST_HORIZON = 'strategic_forecast/change_forecast_horizon'
export const changeForecastHorizon = (tribeId: string, forecastHorizon: string | undefined): PayloadAction<Payload<string, string | undefined>> => {
    return {
        type: CHANGE_FORECAST_HORIZON,
        payload: { stateId: tribeId, data: forecastHorizon }
    }
}

export const CHANGE_TILE = 'change_tile'
export const changeTile = (tribeId: string, tile: number | undefined): PayloadAction<Payload<string, number | undefined>> => {
    return {
        type: CHANGE_TILE,
        payload: { stateId: tribeId, data: tile }
    }
}

export const CHANGE_POSITIONS_FILTER = 'change_positions_filter'
export const changePositionsFilter = (tribeId: string, positionsFilter: Array<string>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_POSITIONS_FILTER,
        payload: { stateId: tribeId, data: positionsFilter }
    }
}

export const CHANGE_LEGENDS = 'change_legends'
export const legendClick = (tribeId: string, legendsOnlyLegends: Array<string>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_LEGENDS,
        payload: { stateId: tribeId, data: legendsOnlyLegends }
    }
}
