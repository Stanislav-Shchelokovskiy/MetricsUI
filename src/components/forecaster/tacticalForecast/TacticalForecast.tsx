import React from 'react'
import { useForecasterSelector, ForecasterStore } from '../store/Store'
import { ForecasterState } from '../store/ForecasterReducer'
import { INITIAL_TACTICAL_FORECAST_STATE, TacticalForecastState } from '../store/TribeContainerReducer'
import ForecastSettingsPanel from './ForecastSettingsPanel'
import ForecastPanel from './ForecastPanel'


export default function TacticalForecast({ tribeId }: { tribeId: string }) {
    const tacticalForecastState: TacticalForecastState = useForecasterSelector((state: ForecasterStore) => state.tacticalForecast.find(x => x.tribeId === tribeId) || INITIAL_TACTICAL_FORECAST_STATE)
    const forecasterState: ForecasterState = useForecasterSelector((state: ForecasterStore) => state.forecaster)
    return (
        <div className='ForecastContainer'>
            <ForecastSettingsPanel tribeId={tribeId}/>
            <ForecastPanel
                tribeId={tribeId}
                incomeType={forecasterState.incomeType}
                replyType={tacticalForecastState.replyType}
                lastUpdated={forecasterState.lastUpdated} />
        </div>
    )
}
