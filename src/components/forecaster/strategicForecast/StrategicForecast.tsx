import React from 'react'
import { useForecasterSelector, ForecasterStore } from '../store/ForecasterStore'
import { ForecasterState } from '../store/ForecasterReducer'
import { INITIAL_STRATEGIC_FORECAST_STATE, StrategicForecastState } from '../store/TribeContainerReducer'
import ForecastSettingsPanel from './ForecastSettingsPanel/ForecastSettingsPanel'
import ForecastPanel, { ForecastPanelState } from './ForecastPanel'



export default function StrategicForecast({ tribeId }: { tribeId: string }) {
    const strategicForecastState: StrategicForecastState = useForecasterSelector((state: ForecasterStore) => state.strategicForecast.find(x => x.tribeId === tribeId) || INITIAL_STRATEGIC_FORECAST_STATE)
    const forecasterState: ForecasterState = useForecasterSelector((state: ForecasterStore) => state.forecaster)

    const forecastPanelState: ForecastPanelState = {
        tribeId: tribeId,
        forecastHorizon: strategicForecastState.forecastHorizon,
        incomeType: forecasterState.incomeType,
        tile: strategicForecastState.tile,
        positionsFilter: strategicForecastState.positionsFilter,
        hiddenLegends: strategicForecastState.legendsOnlyLegends,
        lastUpdated: forecasterState.lastUpdated
    }

    return (
        <div className='ForforecastHorizonecastContainer'>
            <ForecastSettingsPanel
                tribeId={tribeId}
                forecastHorizon={strategicForecastState.forecastHorizon}
                tile={strategicForecastState.tile}
                positionsFilter={strategicForecastState.positionsFilter} />
            <ForecastPanel state={forecastPanelState} />
        </div>
    )
}
