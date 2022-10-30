import endPoint from './endPoint'
import FetchResult from './fetchResult'
import { IncomeForecast } from '../Forecaster'

export const emptyIncomeForecast: FetchResult<IncomeForecast> =
{
    success: false,
    data: {
        ds: Array<Date>(),
        y: Array<number>(),
        yhat: Array<number>(),
        yhat_rmse_upper: Array<number>(),
        yhat_rmse_lower: Array<number>()
    }
}

interface IncomeForecastRaw {
    ds: string
    y: number
    yhat: number
    yhat_rmse_upper: number
    yhat_rmse_lower: number
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
    }) => Promise<FetchResult<IncomeForecast>> = async function ({
        tribeID,
        forecastHorizon,
        incomeType
    }: {
        tribeID: string,
        forecastHorizon: string,
        incomeType: string
    }) {
        try {
            const tribeIncomeForecast: Array<IncomeForecastRaw> = await fetch(
                `${endPoint}/get_forecast?` +
                new URLSearchParams({
                    tribe_id: tribeID,
                    horizon: forecastHorizon,
                    income_type: incomeType
                })
            ).then(response => response.json())

            const ds = tribeIncomeForecast.map(forecast => new Date(forecast.ds))
            const y = tribeIncomeForecast.map(forecast => forecast.y)
            const yhat_rmse_upper = tribeIncomeForecast.map(forecast => forecast.yhat_rmse_upper)
            const yhat = tribeIncomeForecast.map(forecast => forecast.yhat)
            const yhat_rmse_lower = tribeIncomeForecast.map(forecast => forecast.yhat_rmse_lower)

            return {
                success: true,
                data: {
                    ds: ds,
                    y: y,
                    yhat: yhat,
                    yhat_rmse_upper: yhat_rmse_upper,
                    yhat_rmse_lower: yhat_rmse_lower
                }
            }
        } catch (error) {
            console.log(error)
            return emptyIncomeForecast
        }
    }
