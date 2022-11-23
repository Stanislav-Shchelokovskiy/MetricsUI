import React, { useReducer, useEffect, useCallback } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import LoadIndicator from '../../../common/LoadIndicator'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import FetchResult from '../../network_resource_fetcher/FetchResult'
import { fetchForecastHorizons } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { useAppDispatch } from '../../../common/AppStore'
import { changeForecastHorizon } from '../../store/Actions'


interface ForecastSelectorState {
    forecastHorizons: Array<string>
    forecastHorizon: string
}

const INITIAL_STATE: ForecastSelectorState = {
    forecastHorizons: Array<string>(),
    forecastHorizon: ''
}

const CHANGE_FORECAST_HORIZONS = 'change_forecast_horizons'
const CHANGE_FORECAST_HORIZON = 'change_forecast_horizon'

function forecastHorizonSelectorStateReducer(state: ForecastSelectorState, action: AnyAction): ForecastSelectorState {
    switch (action.type) {
        case CHANGE_FORECAST_HORIZONS:
            return {
                ...state,
                forecastHorizons: action.payload
            }
        case CHANGE_FORECAST_HORIZON:
            return {
                ...state,
                forecastHorizon: action.payload
            }
        default:
            return state
    }
}

export default function ForecastHorizonSelector(
    {
        tribeId,
        defaultForecastHorizon
    }:
        {
            tribeId: string
            defaultForecastHorizon: string
        }
) {

    const [forecastHorizonSelectorState, forecastHorizonSelectorDispatch] = useReducer(forecastHorizonSelectorStateReducer, INITIAL_STATE)

    useEffect(() => {
        (async () => {
            const horizonsFetchResult: FetchResult<Array<string>> = await fetchForecastHorizons()
            if (horizonsFetchResult.success) {
                forecastHorizonSelectorDispatch({ type: CHANGE_FORECAST_HORIZONS, payload: horizonsFetchResult.data })
                const forecastHorizon = defaultForecastHorizon || horizonsFetchResult.data[0]
                forecastHorizonSelectorDispatch({ type: CHANGE_FORECAST_HORIZON, payload: forecastHorizon })
                dispatch(changeForecastHorizon(tribeId, forecastHorizon))
            }
        })()
    }, [])

    const dispatch = useAppDispatch()
    const onForecastHorizonChange = useCallback((forecastHorizon: string) => {
        dispatch(changeForecastHorizon(tribeId, forecastHorizon))
    }, [tribeId, dispatch])

    if (forecastHorizonSelectorState.forecastHorizons.length > 0) {
        return (
            <SelectBox
                dataSource={forecastHorizonSelectorState.forecastHorizons}
                defaultValue={forecastHorizonSelectorState.forecastHorizon}
                onValueChange={onForecastHorizonChange}
                label='Forecast Horizon'
                labelMode='static'>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true}
                    container='#tribe_accordion' />
            </SelectBox>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}