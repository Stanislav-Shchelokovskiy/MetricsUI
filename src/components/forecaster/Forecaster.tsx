import './styles/CommonSettingsPanel.css';
import './styles/Tribes.css';
import './styles/Tribe.css';
import './styles/Forecast.css';

import React, { useEffect, useState } from 'react';
import { LoadIndicator } from 'devextreme-react/load-indicator';

import TribesContainer from './Tribes';
import CommonSettingsPanel from './CommonSettingsPanel';
import FetchForecastSettingsValues, { FetchResult, ForecasterSettingsValues } from './TribeLoadServer';


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
    const [forecastSettingsValues, setForecastSettingsValues] = useState<ForecasterSettingsValues>();
    const [forecastSettingsValuesLoaded, setForecastSettingsValuesLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setForecastSettingsValuesLoaded(false);
            const fetchResult: FetchResult = await FetchForecastSettingsValues();
            if (fetchResult.success) {
                setForecastSettingsValuesLoaded(true);
                setForecastSettingsValues(fetchResult.data)
            }
        })();
    }, []);

    return (
        forecastSettingsValuesLoaded ? (
            <div className='Forecaster' >
                <CommonSettingsPanel
                    incomeTypes={forecastSettingsValues?.incomeTypes}
                    tribes={forecastSettingsValues?.tribes} />
                <TribesContainer
                    tribes={forecastSettingsValues?.tribes}
                    replyTypes={forecastSettingsValues?.replyTypes}
                    forecastHorizons={forecastSettingsValues?.forecastHorizons}
                    tiles={forecastSettingsValues?.tiles}
                />
            </div>) :
            <div className='LoadIndicator'>
                <LoadIndicator
                    height={100}
                    width={100} />
            </div>)
}