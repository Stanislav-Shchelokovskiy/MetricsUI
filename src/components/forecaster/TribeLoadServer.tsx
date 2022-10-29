import { Tribe } from './Tribe'
import { IncomeForecast } from './Forecaster'


export interface ForecasterSettingsValues {
    incomeTypes: Array<string> | any
    replyTypes: Array<string> | any
    tiles: Array<number> | any
    forecastHorizons: Array<string> | any
    tribes: Array<Tribe> | any
}

export interface FetchResult<T> {
    success: boolean
    data: T
}

export const emptyForecasterSettingsValues: FetchResult<ForecasterSettingsValues> = {
    success: false,
    data: {
        incomeTypes: Array<string>(),
        replyTypes: Array<string>(),
        tiles: Array<number>(),
        forecastHorizons: Array<string>(),
        tribes: Array<Tribe>(),
    }
}

const endPoint = 'http://ubuntu-support.corp.devexpress.com:11002' //'http://localhost:11002'
export const FetchForecastSettingsValues: () => Promise<FetchResult<ForecasterSettingsValues>> = async function () {
    try {
        const incomeTypes = await fetch(`${endPoint}/get_income_types`).then(response => response.json())
        const replyTypes = await fetch(`${endPoint}/get_reply_type_filters`).then(response => response.json())
        const tiles = await fetch(`${endPoint}/get_tiles`).then(response => response.json())
        const forecastHorizons = await fetch(`${endPoint}/get_forecast_horizons`).then(response => response.json())
        const tribes = await fetch(`${endPoint}/get_available_tribes`).then(response => response.json())
        return {
            success: true,
            data: {
                incomeTypes: (incomeTypes as Array<string>),
                replyTypes: (replyTypes as Array<string>),
                tiles: (tiles as Array<number>),
                forecastHorizons: (forecastHorizons as Array<string>),
                tribes: (tribes as Array<Tribe>),
            }
        }
    } catch (error) {
        console.log(error)
        return emptyForecasterSettingsValues
    }
}


export const emptyIncomeForecast: FetchResult<Array<IncomeForecast>> =
{
    success: false,
    data: [{
        ds: '',
        y: 0,
        yhat: 0,
        yhat_rmse_upper: 0,
        yhat_rmse_lower: 0
    }]
}

export const FetchTribeIncomeForecast: (
    {
        tribeID,
        forecastHorizon,
        incomeType
    }: {
        tribeID: string,
        forecastHorizon: string,
        incomeType: string
    }) => Promise<FetchResult<Array<IncomeForecast>>> = async function ({
        tribeID,
        forecastHorizon,
        incomeType
    }: {
        tribeID: string,
        forecastHorizon: string,
        incomeType: string
    }) {
        try {
            const tribeIncomeForecast = await fetch(
                `${endPoint}/get_forecast?` +
                new URLSearchParams({
                    tribe_id: tribeID,
                    horizon: forecastHorizon,
                    income_type: incomeType
                })
            ).then(response => response.json())

            return {
                success: true,
                data: tribeIncomeForecast
            }
        } catch (error) {
            console.log(error)
            return emptyIncomeForecast
        }
    }
