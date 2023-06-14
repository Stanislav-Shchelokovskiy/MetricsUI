import React from 'react'
import { useSelector } from 'react-redux'
import { ForecasterStore } from '../store/Store'
import ForecastSettingsPanel from './forecast_settings_panel/ForecastSettingsPanel'
import ForecastPanel, { ForecastPanelState } from './ForecastPanel'
import { strategicForecastSelector } from '../store/strategic_forecast/Selectors'
import { forecasterSelector } from '../store/forecaster/Selectors'
import { useTentId } from '../tent/TentContext'


export default function StrategicForecast() {
    const tentId = useTentId()
    const strategicForecastState = useSelector((store: ForecasterStore) => strategicForecastSelector(store, tentId))
    const forecasterState = useSelector(forecasterSelector)

    const forecastPanelState: ForecastPanelState = {
        tentId: tentId,
        forecastHorizon: strategicForecastState.forecastHorizon,
        incomeType: forecasterState.incomeType,
        tile: strategicForecastState.tile,
        positionsFilter: [...strategicForecastState.positions],
        hiddenLegends: [...strategicForecastState.legendsOnlyLegends],
        lastUpdated: forecasterState.lastUpdated
    }

    return (
        <div className='ForecastContainer'>
            <ForecastSettingsPanel />
            <ForecastPanel state={forecastPanelState} />
        </div>
    )
}
