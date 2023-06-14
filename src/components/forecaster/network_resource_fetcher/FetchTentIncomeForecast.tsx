import { FORECASTER_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'

interface RawIncomeForecast {
    ts: string
    y: number
    yhat: number
    yhat_rmse_upper: number
    yhat_rmse_lower: number
}

export interface IncomeForecast {
    ts: Array<Date>
    y: Array<number>
    yhat: Array<number>
    yhat_rmse_upper: Array<number>
    yhat_rmse_lower: Array<number>
}

export const EMPTY_INCOME_FORECAST = {
    ts: Array<Date>(),
    y: Array<number>(),
    yhat: Array<number>(),
    yhat_rmse_upper: Array<number>(),
    yhat_rmse_lower: Array<number>()
}

function convert(tribeIncomeForecast: Array<RawIncomeForecast> | undefined): IncomeForecast {
    if (tribeIncomeForecast)
        return {
            ts: tribeIncomeForecast.map(forecast => new Date(forecast.ts)),
            y: tribeIncomeForecast.map(forecast => forecast.y),
            yhat: tribeIncomeForecast.map(forecast => forecast.yhat),
            yhat_rmse_upper: tribeIncomeForecast.map(forecast => forecast.yhat_rmse_upper),
            yhat_rmse_lower: tribeIncomeForecast.map(forecast => forecast.yhat_rmse_lower)
        }
    return EMPTY_INCOME_FORECAST
}

export async function FetchTentIncomeForecast(tentId: string, forecastHorizon: string, incomeType: string): Promise<FetchResult<IncomeForecast>> {
    return fetchConvert(convert,
        `${FORECASTER_END_POINT}/tent_income_forecast?` +
        new URLSearchParams({
            tent_id: tentId,
            horizon: forecastHorizon,
            income_type: incomeType
        })
    )
}
