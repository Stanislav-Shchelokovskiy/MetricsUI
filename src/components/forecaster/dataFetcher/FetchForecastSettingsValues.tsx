import endPoint from './EndPoint'
import FetchResult from './FetchResult'
import { Tribe } from '../Tribe'

export interface ForecasterSettingsValues {
    incomeTypes: Array<string>
    replyTypes: Array<string>
    tiles: Array<number>
    forecastHorizons: Array<string>
    tribes: Array<Tribe>
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
