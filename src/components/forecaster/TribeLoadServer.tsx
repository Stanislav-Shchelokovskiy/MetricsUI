import { Tribe } from './Tribe'


interface ForecasterSettingsValues {
    incomeTypes: Array<string> | any
    replyTypes: Array<string> | any
    tiles: Array<number> | any
    forecastHorizons: Array<string> | any
    tribes: Array<Tribe> | any
}

export interface FetchResult {
    success: boolean
    forecastSettingsValues: ForecasterSettingsValues
}

export const emptyFetchResult: FetchResult = {
    success: false,
    forecastSettingsValues: {
        incomeTypes: Array<string>(),
        replyTypes: Array<string>(),
        tiles: Array<number>(),
        forecastHorizons: Array<string>(),
        tribes: Array<Tribe>(),
    }
}


const FetchForecastSettingsValues: () => Promise<FetchResult> = async function () {
    try {
        const endPoint = 'http://localhost:11002'
        const incomeTypes = await fetch(`${endPoint}/get_income_types`).then(response => response.json())
        const replyTypes = await fetch(`${endPoint}/get_reply_type_filters`).then(response => response.json())
        const tiles = await fetch(`${endPoint}/get_tiles`).then(response => response.json())
        const forecastHorizons = await fetch(`${endPoint}/get_forecast_horizons`).then(response => response.json())
        const tribes = await fetch(`${endPoint}/get_available_tribes`).then(response => response.json())
        return {
            success: true, forecastSettingsValues: {
                incomeTypes: (incomeTypes as Array<string>),
                replyTypes: (replyTypes as Array<string>),
                tiles: (tiles as Array<number>),
                forecastHorizons: (forecastHorizons as Array<string>),
                tribes: (tribes as Array<Tribe>),
            }
        }
    } catch (error) {
        console.log(error)
        return emptyFetchResult
    }
}

export default FetchForecastSettingsValues
