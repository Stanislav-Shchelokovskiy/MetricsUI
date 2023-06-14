import { FORECASTER_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'

interface RawTacticalForecast {
    ts: string
    yhat_rmse_upper: number
    yhat: number
    yhat_rmse_lower: number
    iterations: number
    upper_iterations: number
}

export interface HourlyTacticalForecast {
    ts: Array<Date>
    yhat_rmse_upper: Array<number>
    yhat: Array<number>
    yhat_rmse_lower: Array<number>
    iterations: Array<number>
    upper_iterations: Array<number>
}

export const EMPTY_TACTICAL_FORECAST = {
    ts: Array<Date>(),
    yhat_rmse_upper: Array<number>(),
    yhat: Array<number>(),
    yhat_rmse_lower: Array<number>(),
    iterations: Array<number>(),
    upper_iterations: Array<number>()
}

function convert(rawTacticalForecast: Array<RawTacticalForecast> | undefined): HourlyTacticalForecast {
    if (rawTacticalForecast)
        return {
            ts: rawTacticalForecast.map(forecast => new Date(forecast.ts)),
            yhat_rmse_upper: rawTacticalForecast.map(forecast => forecast.yhat_rmse_upper),
            yhat: rawTacticalForecast.map(forecast => forecast.yhat),
            yhat_rmse_lower: rawTacticalForecast.map(forecast => forecast.yhat_rmse_lower),
            iterations: rawTacticalForecast.map(forecast => forecast.iterations),
            upper_iterations: rawTacticalForecast.map(forecast => forecast.upper_iterations)
        }
    return EMPTY_TACTICAL_FORECAST
}
export async function fetchTacticalForecast(incomeType: string, tentId: string, replyType: string,): Promise<FetchResult<HourlyTacticalForecast>> {
    return fetchConvert(convert,
        `${FORECASTER_END_POINT}/tactical_forecast?` + new URLSearchParams({
            income_type: incomeType,
            tent_id: tentId,
            reply_type_filter: replyType
        })
    )
}
