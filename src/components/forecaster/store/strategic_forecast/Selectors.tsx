import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { ForecasterStore } from '../Store'
import { StrategicForecast, INITIAL_STATE } from './StrategicForecastReducer'

function tacticalForecastsSelector(store: ForecasterStore) {
    return store.strategicForecasts
}
const tentIdSelector = (store: ForecasterStore, tentId: string) => tentId

function strategicForecastSelectorInner(forecasts: Array<StrategicForecast>, tentId: string) {
    return forecasts.find(x => x.tentId === tentId) || INITIAL_STATE
}

function get_selector<T>(selector: (forecast: StrategicForecast) => T) {
    return createSelector(
        [tacticalForecastsSelector, tentIdSelector],
        (forecast, tentId) => selector(strategicForecastSelectorInner(forecast, tentId))
    )
}

export const strategicForecastSelector = createSelector(
    [tacticalForecastsSelector, tentIdSelector],
    (forecast, tentId) => strategicForecastSelectorInner(forecast, tentId)
)

export const forecastHorizonSelector = get_selector(forecast => forecast.forecastHorizon)
export const positionsSelector = get_selector(forecast => forecast.positions)
export const tileSelector = get_selector(forecast => forecast.tile)
