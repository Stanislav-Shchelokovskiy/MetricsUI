import './styles/CommonSettingsPanel.css'
import './styles/Tribes.css'
import './styles/Tribe.css'
import './styles/Forecast.css'

import React, { useEffect, useState } from 'react'
import LoadIndicator from './utils/LoadIndicator'

import TribesContainer from './Tribes'
import { Tribe } from './Tribe'
import CommonSettingsPanel from './CommonSettingsPanel'
import { FetchForecastSettingsValues, emptyForecasterSettingsValues, FetchResult, ForecasterSettingsValues } from './TribeLoadServer'


export interface RepliesForecast {
    ds: string
    yhat: number
    yhat_rmse_upper: number
    yhat_rmse_lower: number
}

export interface IncomeForecast {
    ds: string
    y: number
    yhat: number
    yhat_rmse_upper: number
    yhat_rmse_lower: number
}


export default function Forecaster() {
    const [{ success: forecastSettingsValuesLoaded, data: forecastSettingsValues }, setForecastSettingsValuesLoaded] = useState(emptyForecasterSettingsValues)
    const [tribes, setTribes] = useState<Array<Tribe>>([])
    const [incomeType, setIncomeType] = useState<string>('')
    console.log(tribes)
    console.log(incomeType)

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<ForecasterSettingsValues> = await FetchForecastSettingsValues()
            setForecastSettingsValuesLoaded(fetchResult)
            if (fetchResult.success) {
                setIncomeType(fetchResult.data.incomeTypes?.[0])
            }
        })()
    }, [])

    if (forecastSettingsValuesLoaded) {
        return (
            <div className='Forecaster' >
                <CommonSettingsPanel
                    incomeTypes={forecastSettingsValues?.incomeTypes}
                    defaultIncomeType={forecastSettingsValues?.incomeTypes[0]}
                    tribes={forecastSettingsValues?.tribes}
                    onTribeSelect={setTribes}
                    onIncomeTypeChange={setIncomeType} />
                {tribes.length ? (
                    <TribesContainer
                        tribes={tribes}
                        incomeType={incomeType}
                        replyTypes={forecastSettingsValues?.replyTypes}
                        forecastHorizons={forecastSettingsValues?.forecastHorizons}
                        tiles={forecastSettingsValues?.tiles}
                    />) : (<div></div>)}
            </div>
        )
    }
    return <LoadIndicator />
}
