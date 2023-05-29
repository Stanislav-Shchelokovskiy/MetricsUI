import { FORECASTER_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { Tribe } from '../../common/Interfaces'

export interface ForecasterSettingsValues {
    incomeTypes: Array<string>
    replyTypes: Array<string>
    tiles: Array<number>
    dailyForecastHorizons: Array<string>
    tribes: Array<Tribe>
}

export const EMPTY_FORECATER_SETTINGS_VALUES: FetchResult<ForecasterSettingsValues> = {
    success: false,
    data: {
        incomeTypes: Array<string>(),
        replyTypes: Array<string>(),
        tiles: Array<number>(),
        dailyForecastHorizons: Array<string>(),
        tribes: Array<Tribe>(),
    }
}

export async function fetchIncomeTypes(): Promise<FetchResult<Array<string>>> {
    return fetchArray(`${FORECASTER_END_POINT}/get_income_types`)
}

export async function fetchReplyTypes(): Promise<FetchResult<Array<string>>> {
    return fetchArray(`${FORECASTER_END_POINT}/get_reply_type_filters`)
}

export async function fetchForecastHorizons(): Promise<FetchResult<Array<string>>> {
    return fetchArray(`${FORECASTER_END_POINT}/get_daily_horizons`)
}

export async function fetchTiles(): Promise<FetchResult<Array<number>>> {
    return fetchArray(`${FORECASTER_END_POINT}/get_tiles`)
}
