import './styles/CommonSettingsPanel.css'
import './styles/Tribes.css'
import './styles/Tribe.css'
import './styles/Forecast.css'
import './styles/Menu.css'
import './styles/CommandPanel.css'

import React, { useEffect, useState } from 'react'
import LoadIndicator from './utils/LoadIndicator'
import TribesContainer from './Tribes'
import { Tribe } from './Tribe'
import CommonSettingsPanel from './menu/CommonSettingsPanel'
import CommandPanel from './menu/CommandPanel'

import FetchResult from './network_resource_fetcher/FetchResult'
import { FetchForecastSettingsValues, EMPTY_FORECATER_SETTINGS_VALUES, ForecasterSettingsValues } from './network_resource_fetcher/FetchForecastSettingsValues'


export default function Forecaster() {
    const [{ success: forecastSettingsValuesLoaded, data: forecastSettingsValues }, setForecastSettingsValuesLoaded] = useState(EMPTY_FORECATER_SETTINGS_VALUES)
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
                <div className='Menu' >
                    <CommonSettingsPanel
                        incomeTypes={forecastSettingsValues?.incomeTypes}
                        defaultIncomeType={forecastSettingsValues?.incomeTypes[0]}
                        tribes={forecastSettingsValues?.tribes}
                        onTribeSelect={setTribes}
                        onIncomeTypeChange={setIncomeType} />
                    <CommandPanel />
                </div>
                {tribes.length ? (
                    <TribesContainer
                        tribes={tribes}
                        incomeType={incomeType}
                        replyTypes={forecastSettingsValues?.replyTypes}
                        dailyForecastHorizons={forecastSettingsValues?.dailyForecastHorizons}
                        tiles={forecastSettingsValues?.tiles}
                    />) : (<div></div>)}
            </div>
        )
    }
    return <LoadIndicator
        width={100}
        height={100} />
}
