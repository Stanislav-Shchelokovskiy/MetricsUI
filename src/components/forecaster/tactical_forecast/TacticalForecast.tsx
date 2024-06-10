import React from 'react'
import ForecastSettingsPanel from './ForecastSettingsPanel'
import ForecastPanel from './ForecastPanel'

export default function TacticalForecast() {
    return (
        <div className='ForecastContainer'>
            <ForecastSettingsPanel />
            <ForecastPanel />
        </div>
    )
}
