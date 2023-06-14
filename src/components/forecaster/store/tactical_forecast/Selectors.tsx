import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { ForecasterStore } from '../Store'
import { TacticalForecast } from './TacticalForecastsReducer'
import { INITIAL_STATE } from './TacticalForecastsReducer'

export function tacticalForecastsSelector(store: ForecasterStore) {
    return store.tacticalForecasts
}
const tentIdSelector = (store: ForecasterStore, tentId: string) => tentId

export function tacticalForecastSelector(forecasts: Array<TacticalForecast>, tentId: string) {
    return forecasts.find(x => x.tentId === tentId) || INITIAL_STATE
}

function get_selector(selector: (forecast: TacticalForecast) => string) {
    return createSelector(
        [tacticalForecastsSelector, tentIdSelector],
        (forecast, tentId) => selector(tacticalForecastSelector(forecast, tentId))
    )
}

export const replyTypeSelector = get_selector(forecast => forecast.replyType)
