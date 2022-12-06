import React, { useCallback } from 'react'
import Accordion, { Item } from 'devextreme-react/accordion'
import { Tribe } from '../common/Interfaces'
import { useAppSelector, AppStore, useAppDispatch } from '../common/AppStore'
import { selectForecastItems } from './store/Actions'
import { ForecasterItemsState, INITIAL_FORECAST_ITEMS_EXPANDED_STATE } from './store/TribeContainerReducer'
import TacticalForecast from './tacticalForecast/TacticalForecast'
import StrategicForecast from './strategicForecast/StrategicForecast'


export interface ForecastMainParams {
    tribeID: string
    incomeType: string
    lastUpdate: number
}

export interface TribeContainerState {
    tribe: Tribe
    incomeType: string
    replyTypes: Array<string>
    defaultReplyType: string
    dailyForecastHorizons: Array<string>
    defaultDailyForecastHorizon: string
    tiles: Array<number>
    defaultTile: number
    lastUpdate: number
}


export default function TribeContainer({ tribe }: { tribe: Tribe }) {
    const forecasterItemsState: ForecasterItemsState = useAppSelector((state: AppStore) => state.selectedForecastItems.find(x => x.tribeId === tribe.id)) || INITIAL_FORECAST_ITEMS_EXPANDED_STATE

    const dispatch = useAppDispatch()
    const onSelectedItemsChange = useCallback((e: any) => {
        dispatch(selectForecastItems(tribe.id, e))
    }, [dispatch, tribe.id])

    return (
        <div className='Tribe'>
            <Header tribeName={tribe.name} />
            <Accordion
                id='tribe_accordion'
                collapsible={true}
                multiple={true}
                focusStateEnabled={false}
                keyExpr='title'
                defaultSelectedItemKeys={forecasterItemsState.expandedItems}
                onSelectedItemKeysChange={onSelectedItemsChange}
            >
                <Item title='Tactical forecast'>
                    <TacticalForecast tribeId={tribe.id} />
                </Item>
                <Item title='Strategic forecast' >
                    <StrategicForecast tribeId={tribe.id} />
                </Item>
            </Accordion>
        </div>
    )
}

function Header({ tribeName }: { tribeName: string }) {
    return <h3 className='TribeHeader'> {tribeName}</h3 >
}
