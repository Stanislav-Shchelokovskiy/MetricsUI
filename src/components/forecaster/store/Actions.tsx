import { PayloadAction } from '@reduxjs/toolkit'
import { Tribe, Payload } from '../../common/Interfaces'


export const CHANGE_INCOME_TYPE = 'forecaster/change_income_type'
export const changeIncomeType = (incomeType: string | undefined): PayloadAction<string | undefined> => {
    return {
        type: CHANGE_INCOME_TYPE,
        payload: incomeType
    }
}

export const CHANGE_SELECTED_TENTS = 'forecaster/change_selected_tents'
export const changeSelectedTents = (selectedTribes: Array<Tribe>): PayloadAction<Array<Tribe>> => {
    return {
        type: CHANGE_SELECTED_TENTS,
        payload: selectedTribes
    }
}

export const CHANGE_LAST_UPDATED = 'forecaster/change_last_updated'
export const changeLastUpdated = (): PayloadAction<number> => {
    return {
        type: CHANGE_LAST_UPDATED,
        payload: Date.now()
    }
}

export const CHANGE_REPLY_TYPE = 'tactical_forecast/change_reply_type'
export const changeReplyType = (tribeId: string, replyType: string | undefined): PayloadAction<Payload<string, string | undefined>> => {
    return {
        type: CHANGE_REPLY_TYPE,
        payload: { stateId: tribeId, data: replyType }
    }
}

export const CHANGE_FORECAST_HORIZON = 'strategic_forecast/change_forecast_horizon'
export const changeForecastHorizon = (tribeId: string, forecastHorizon: string | undefined): PayloadAction<Payload<string, string | undefined>> => {
    return {
        type: CHANGE_FORECAST_HORIZON,
        payload: { stateId: tribeId, data: forecastHorizon }
    }
}

export const CHANGE_TILE = 'strategic_forecast/change_tile'
export const changeTile = (tribeId: string, tile: number | undefined): PayloadAction<Payload<string, number | undefined>> => {
    return {
        type: CHANGE_TILE,
        payload: { stateId: tribeId, data: tile }
    }
}

export const CHANGE_POSITIONS_FILTER = 'strategic_forecast/change_positions_filter'
export const changePositionsFilter = (tribeId: string, positionsFilter: Array<string>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_POSITIONS_FILTER,
        payload: { stateId: tribeId, data: positionsFilter }
    }
}

export const CHANGE_LEGENDS = 'strategic_forecast/change_legends'
export const legendClick = (tribeId: string, legendsOnlyLegends: Array<string>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_LEGENDS,
        payload: { stateId: tribeId, data: legendsOnlyLegends }
    }
}

export const EXPAND_FORECAST_ITEMS = 'tribes_container/expand_forecast_items'
export const selectForecastItems = (tribeId: string, expandedItems: Array<string>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: EXPAND_FORECAST_ITEMS,
        payload: { stateId: tribeId, data: expandedItems }
    }
}
