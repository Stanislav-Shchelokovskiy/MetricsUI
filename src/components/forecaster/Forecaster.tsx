import './styles/CommonSettingsPanel.css'
import './styles/Tribes.css'
import './styles/Tribe.css'
import './styles/Forecast.css'
import './styles/Menu.css'
import './styles/CommandPanel.css'

import React, { useEffect, useReducer } from 'react'
import LoadIndicator from './utils/LoadIndicator'
import TribesContainer, { TribesTribeContainerState } from './Tribes'
import CommonSettingsPanel from './menu/CommonSettingsPanel'
import CommandPanel from './menu/CommandPanel'
import { Tribe } from './Tribe'

import FetchResult from './network_resource_fetcher/FetchResult'
import { FetchForecastSettingsValues, EMPTY_FORECATER_SETTINGS_VALUES, ForecasterSettingsValues } from './network_resource_fetcher/FetchForecastSettingsValues'


interface ForecasterState {
    forecasterSettingsValuesLoaded: boolean
    incomeTypes: Array<string>
    tribes: Array<Tribe>
    tribesContainerState: TribesTribeContainerState
}

export interface Action {
    type: string
    payload: any
}


function tribeContainerStateReducer(state: ForecasterState, action: Action): ForecasterState {
    switch (action.type) {
        case 'forecasterSettingsValuesLoadedChange':
            if (state.forecasterSettingsValuesLoaded === action.payload) {
                return state
            }
            return {
                ...state,
                forecasterSettingsValuesLoaded: action.payload,
            }

        case 'forecastSettingsValuesChange':
            if (state.tribesContainerState === action.payload) {
                return state;
            }
            return {
                ...state,
                tribes: action.payload.tribes,
                incomeTypes: action.payload.incomeTypes,
                tribesContainerState: {
                    incomeType: action.payload.incomeTypes[0],

                    replyTypes: action.payload.replyTypes,
                    defaultReplyType: action.payload.replyTypes[0],

                    dailyForecastHorizons: action.payload.dailyForecastHorizons,
                    defaultDailyForecastHorizon: action.payload.dailyForecastHorizons[0],

                    tiles: action.payload.tiles,
                    defaultTile: action.payload.tiles[Math.floor(action.payload.tiles.length / 2)],

                    tribes: Array<Tribe>(),

                    lastUpdate: state.tribesContainerState.lastUpdate
                }
            }

        case 'tribesChange':
            if (state.tribesContainerState.tribes === action.payload) {
                return state
            }
            return {
                ...state,
                tribesContainerState: {
                    ...state.tribesContainerState,
                    tribes: action.payload
                }
            }

        case 'incomeTypeChange':
            if (state.tribesContainerState.incomeType === action.payload) {
                return state
            }
            return {
                ...state,
                tribesContainerState: {
                    ...state.tribesContainerState,
                    incomeType: action.payload,
                }
            }

        case 'lastDataUpdateChange':
            if (state.tribesContainerState.lastUpdate === action.payload) {
                return state
            }
            return {
                ...state,
                tribesContainerState: {
                    ...state.tribesContainerState,
                    lastUpdate: action.payload
                }
            }

        default:
            throw new Error('Invalid action type ' + action.type);
    }
}

export default function Forecaster() {
    const initialTribesContainerState: ForecasterState = {
        forecasterSettingsValuesLoaded: false,
        incomeTypes: Array<string>(),
        tribes: Array<Tribe>(),
        tribesContainerState: {
            ...EMPTY_FORECATER_SETTINGS_VALUES.data,
            incomeType: '',
            defaultReplyType: '',
            defaultDailyForecastHorizon: '',
            defaultTile: 0,
            lastUpdate: Date.now()
        }
    }
    const [forecasterState, tribeContainerStateDispatch] = useReducer(tribeContainerStateReducer, initialTribesContainerState)

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<ForecasterSettingsValues> = await FetchForecastSettingsValues()
            if (fetchResult.success) {
                tribeContainerStateDispatch({ type: 'forecastSettingsValuesChange', payload: fetchResult.data })
                tribeContainerStateDispatch({ type: 'forecasterSettingsValuesLoadedChange', payload: fetchResult.success })
            }
        })()
    }, [])

    if (forecasterState.forecasterSettingsValuesLoaded) {
        return (
            <div className='Forecaster' >
                <div aria-label='Menu' className='Menu' >
                    <CommonSettingsPanel
                        incomeTypes={forecasterState.incomeTypes}
                        defaultIncomeType={forecasterState.tribesContainerState.incomeType}
                        tribes={forecasterState.tribes}
                        forecastDispatch={tribeContainerStateDispatch} />
                    <CommandPanel forecastDispatch={tribeContainerStateDispatch} />
                </div>
                {forecasterState.tribesContainerState.tribes.length ? <TribesContainer state={forecasterState.tribesContainerState} /> : <div></div>}
            </div>
        )
    }
    return <LoadIndicator width={100} height={100} />
}
