import React from 'react'
import { useForecasterSelector, ForecasterStore } from '../store/Store'
import { ForecasterState } from '../store/ForecasterReducer'
import { INITIAL_TACTICAL_FORECAST_STATE, TacticalForecastState } from '../store/TentContainerReducer'
import ForecastSettingsPanel from './ForecastSettingsPanel'
import ForecastPanel from './ForecastPanel'


export default function TacticalForecast({ tentId }: { tentId: string }) {
    const tacticalForecastState: TacticalForecastState = useForecasterSelector((state: ForecasterStore) => state.tacticalForecast.find(x => x.tentId === tentId) || INITIAL_TACTICAL_FORECAST_STATE)
    const forecasterState: ForecasterState = useForecasterSelector((state: ForecasterStore) => state.forecaster)
    return (
        <div className='ForecastContainer'>
            <ForecastSettingsPanel tentId={tentId} />
            <ForecastPanel
                tentId={tentId}
                incomeType={forecasterState.incomeType}
                replyType={tacticalForecastState.replyType}
                lastUpdated={forecasterState.lastUpdated} />
        </div>
    )
}
