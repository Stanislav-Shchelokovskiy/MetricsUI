import FORECASTER_END_POINT from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'


interface RawTacticalForecast {
    ts: string
    yhat_rmse_upper: number
    yhat: number
    yhat_rmse_lower: number
    iteration_count: number
    upper_replies: number
}

export interface HourlyTacticalForecast {
    ts: Array<Date>
    yhat_rmse_upper: Array<number>
    yhat: Array<number>
    yhat_rmse_lower: Array<number>
    iteration_count: Array<number>
    upper_replies: Array<number>
}


export const EMPTY_TACTICAL_FORECAST: FetchResult<HourlyTacticalForecast> =
{
    success: false,
    data: {
        ts: Array<Date>(),
        yhat_rmse_upper: Array<number>(),
        yhat: Array<number>(),
        yhat_rmse_lower: Array<number>(),
        iteration_count: Array<number>(),
        upper_replies: Array<number>()
    }
}


export const FetchTacticalForecast: (incomeType: string, tribeId: string, replyType: string,) => Promise<FetchResult<HourlyTacticalForecast>> =
    async function (incomeType: string, tribeId: string, replyType: string) {
        try {
            const rawTacticalForecast: Array<RawTacticalForecast> = await fetch(
                `${FORECASTER_END_POINT}/get_tactical_forecast?` + new URLSearchParams({
                    income_type: incomeType,
                    tribe_id: tribeId,
                    reply_type_filter: replyType
                })
            ).then(response => response.json())

            const ts = rawTacticalForecast.map(forecast => new Date(forecast.ts))
            const yhat_rmse_upper = rawTacticalForecast.map(forecast => forecast.yhat_rmse_upper)
            const yhat = rawTacticalForecast.map(forecast => forecast.yhat)
            const yhat_rmse_lower = rawTacticalForecast.map(forecast => forecast.yhat_rmse_lower)
            const iteration_count = rawTacticalForecast.map(forecast => forecast.iteration_count)
            const upper_replies = rawTacticalForecast.map(forecast => forecast.upper_replies)

            return {
                success: true,
                data: {
                    ts: ts,
                    yhat_rmse_upper: yhat_rmse_upper,
                    yhat: yhat,
                    yhat_rmse_lower: yhat_rmse_lower,
                    iteration_count: iteration_count,
                    upper_replies: upper_replies
                }
            }
        } catch (error) {
            console.log(error)
            return EMPTY_TACTICAL_FORECAST
        }
    }
