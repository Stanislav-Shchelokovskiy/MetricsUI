import { PayloadAction } from '@reduxjs/toolkit'
import { Tribe } from '../../common/Interfaces'

interface Payload<T> {
    tribeId: string
    data: T
}

export const CHANGE_INCOME_TYPE = 'forecaster/change_income_type'
export const changeIncomeType = (incomeType: string): PayloadAction<string> => {
    return {
        type: CHANGE_INCOME_TYPE,
        payload: incomeType
    }
}

export const CHANGE_SELECTED_TRIBES = 'forecaster/change_selected_tribes'
export const changeSelectedTribes = (selectedTribes: Array<Tribe>): PayloadAction<Array<Tribe>> => {
    return {
        type: CHANGE_SELECTED_TRIBES,
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
export const changeReplyType = (tribeId: string, replyType: string): PayloadAction<Payload<string>> => {
    return {
        type: CHANGE_REPLY_TYPE,
        payload: { tribeId: tribeId, data: replyType }
    }
}

export const CHANGE_FORECAST_HORIZON = 'strategic_forecast/change_forecast_horizon'
export const changeForecastHorizon = (tribeId: string, forecastHorizon: string): PayloadAction<Payload<string>> => {
    return {
        type: CHANGE_FORECAST_HORIZON,
        payload: { tribeId: tribeId, data: forecastHorizon }
    }
}

export const CHANGE_TILE = 'strategic_forecast/change_tile'
export const changeTile = (tribeId: string, tile: number): PayloadAction<Payload<number>> => {
    return {
        type: CHANGE_TILE,
        payload: { tribeId: tribeId, data: tile }
    }
}

export const CHANGE_POSITIONS_FILTER = 'strategic_forecast/change_positions_filter'
export const changePositionsFilter = (tribeId: string, positionsFilter: Array<string>): PayloadAction<Payload<Array<string>>> => {
    return {
        type: CHANGE_POSITIONS_FILTER,
        payload: { tribeId: tribeId, data: positionsFilter }
    }
}

export const CHANGE_LEGENDS = 'strategic_forecast/change_legends'
export const legendClick = (tribeId: string, legendsOnlyLegends: Array<string>): PayloadAction<Payload<Array<string>>> => {
    return {
        type: CHANGE_LEGENDS,
        payload: { tribeId: tribeId, data: legendsOnlyLegends }
    }
}

export const EXPAND_FORECAST_ITEMS = 'tribes_container/expand_forecast_items'
export const selectForecastItems = (tribeId: string, expandedItems: Array<string>): PayloadAction<Payload<Array<string>>> => {
    return {
        type: EXPAND_FORECAST_ITEMS,
        payload: { tribeId: tribeId, data: expandedItems }
    }
}
