import React from 'react'
import { useForecasterSelector, ForecasterStore } from '../store/Store'
import { ForecasterState } from '../store/ForecasterReducer'
import { INITIAL_STRATEGIC_FORECAST_STATE, StrategicForecastState } from '../store/TentContainerReducer'
import ForecastSettingsPanel from './ForecastSettingsPanel/ForecastSettingsPanel'
import ForecastPanel, { ForecastPanelState } from './ForecastPanel'


export default function StrategicForecast({ tentId: tentId }: { tentId: string }) {
    const strategicForecastState: StrategicForecastState = useForecasterSelector((state: ForecasterStore) =>
        state.strategicForecast.find(x => x.tentId === tentId) || INITIAL_STRATEGIC_FORECAST_STATE
    )
    const forecasterState: ForecasterState = useForecasterSelector((state: ForecasterStore) => state.forecaster)

    const forecastPanelState: ForecastPanelState = {
        tentId: tentId,
        forecastHorizon: strategicForecastState.forecastHorizon,
        incomeType: forecasterState.incomeType,
        tile: strategicForecastState.tile,
        positionsFilter: [...strategicForecastState.positionsFilter],
        hiddenLegends: [...strategicForecastState.legendsOnlyLegends],
        lastUpdated: forecasterState.lastUpdated
    }

    return (
        <div className='ForforecastHorizonecastContainer'>
            <ForecastSettingsPanel tentId={tentId} />
            <ForecastPanel state={forecastPanelState} />
        </div>
    )
}
