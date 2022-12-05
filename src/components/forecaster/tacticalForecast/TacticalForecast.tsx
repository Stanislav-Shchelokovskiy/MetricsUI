import React from 'react'
import { useAppSelector, AppStore } from '../../common/AppStore'
import { ForecasterState } from '../store/ForecasterReducer'
import { INITIAL_TACTICAL_FORECAST_STATE, TacticalForecastState } from '../store/TribeContainerReducer'
import ForecastSettingsPanel from './ForecastSettingsPanel'
import ForecastPanel from './ForecastPanel'


export default function TacticalForecast({ tribeId }: { tribeId: string }) {
    const tacticalForecastState: TacticalForecastState = useAppSelector((state: AppStore) => state.tacticalForecast.find(x => x.tribeId === tribeId) || INITIAL_TACTICAL_FORECAST_STATE)
    const forecasterState: ForecasterState = useAppSelector((state: AppStore) => state.forecaster)
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
