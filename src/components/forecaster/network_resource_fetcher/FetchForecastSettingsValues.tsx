import FORECASTER_END_POINT from './EndPoint'
import FetchResult from './FetchResult'
import { Tribe } from '../Tribe'

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

export const FetchForecastSettingsValues: () => Promise<FetchResult<ForecasterSettingsValues>> = async function () {
    try {
        const incomeTypes = await fetch(`${FORECASTER_END_POINT}/get_income_types`).then(response => response.json())
        const replyTypes = await fetch(`${FORECASTER_END_POINT}/get_reply_type_filters`).then(response => response.json())
        const tiles = await fetch(`${FORECASTER_END_POINT}/get_tiles`).then(response => response.json())
        const dailyForecastHorizons = await fetch(`${FORECASTER_END_POINT}/get_daily_horizons`).then(response => response.json())
        const tribes = await fetch(`${FORECASTER_END_POINT}/get_available_tribes`).then(response => response.json())
        return {
            success: true,
            data: {
                incomeTypes: (incomeTypes as Array<string>),
                replyTypes: (replyTypes as Array<string>),
                tiles: (tiles as Array<number>),
                dailyForecastHorizons: (dailyForecastHorizons as Array<string>),
                tribes: (tribes as Array<Tribe>),
            }
        }
    } catch (error) {
        console.log(error)
        return EMPTY_FORECATER_SETTINGS_VALUES
    }
}