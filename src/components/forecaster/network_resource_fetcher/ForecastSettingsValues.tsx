import { FORECASTER_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Typing'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { Knot } from '../../common/Typing'

export interface ForecasterSettingsValues {
    incomeTypes: Array<string>
    replyTypes: Array<string>
    tiles: Array<number>
    dailyForecastHorizons: Array<string>
    tribes: Array<Knot>
}

export const EMPTY_FORECATER_SETTINGS_VALUES: FetchResult<ForecasterSettingsValues> = {
    success: false,
    data: {
        incomeTypes: Array<string>(),
        replyTypes: Array<string>(),
        tiles: Array<number>(),
        dailyForecastHorizons: Array<string>(),
        tribes: Array<Knot>(),
    }
}

export async function fetchIncomeTypes(): Promise<FetchResult<Array<string>>> {
    return fetchArray(`${FORECASTER_END_POINT}/income_types`)
}

export async function fetchReplyTypes(): Promise<FetchResult<Array<string>>> {
    return fetchArray(`${FORECASTER_END_POINT}/reply_type_filters`)
}

export async function fetchForecastHorizons(): Promise<FetchResult<Array<string>>> {
    return fetchArray(`${FORECASTER_END_POINT}/daily_horizons`)
}

export async function fetchTiles(): Promise<FetchResult<Array<number>>> {
    return fetchArray(`${FORECASTER_END_POINT}/tiles`)
}
