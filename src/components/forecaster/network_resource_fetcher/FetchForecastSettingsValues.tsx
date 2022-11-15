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

export const fetchIncomeTypes: () => Promise<FetchResult<Array<string>>> = async function () {
    try {
        const incomeTypes = await fetch(`${FORECASTER_END_POINT}/get_income_types`).then(response => response.json())
        return {
            success: true,
            data: (incomeTypes as Array<string>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<string>()
        }
    }
}

export const fetchTribes: () => Promise<FetchResult<Array<Tribe>>> = async function () {
    try {
        const tribes = await fetch(`${FORECASTER_END_POINT}/get_available_tribes`).then(response => response.json())
        return {
            success: true,
            data: (tribes as Array<Tribe>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<Tribe>()
        }
    }
}

export const fetchReplyTypes: () => Promise<FetchResult<Array<string>>> = async function () {
    try {
        const replyTypes = await fetch(`${FORECASTER_END_POINT}/get_reply_type_filters`).then(response => response.json())
        return {
            success: true,
            data: (replyTypes as Array<string>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<string>()
        }
    }
}

export const fetchForecastHorizons: () => Promise<FetchResult<Array<string>>> = async function () {
    try {
        const forecastHorizons = await fetch(`${FORECASTER_END_POINT}/get_daily_horizons`).then(response => response.json())
        return {
            success: true,
            data: (forecastHorizons as Array<string>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<string>()
        }
    }
}

export const fetchTiles: () => Promise<FetchResult<Array<number>>> = async function () {
    try {
        const tiles = await fetch(`${FORECASTER_END_POINT}/get_tiles`).then(response => response.json())
        return {
            success: true,
            data: (tiles as Array<number>)
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: Array<number>()
        }
    }
}
