import React, { useCallback } from 'react'
import Accordion, { Item } from 'devextreme-react/accordion'
import { Tribe } from '../common/Interfaces'
import { useForecasterSelector, ForecasterStore, useForecasterDispatch } from './store/Store'
import { selectForecastItems } from './store/Actions'
import { ForecasterItemsState, INITIAL_FORECAST_ITEMS_EXPANDED_STATE } from './store/TentContainerReducer'
import TacticalForecast from './tacticalForecast/TacticalForecast'
import StrategicForecast from './strategicForecast/StrategicForecast'


export interface ForecastMainParams {
    tentId: string
    incomeType: string
    lastUpdate: number
}

export interface TribeContainerState {
    tent: Tribe
    incomeType: string
    replyTypes: Array<string>
    defaultReplyType: string
    dailyForecastHorizons: Array<string>
    defaultDailyForecastHorizon: string
    tiles: Array<number>
    defaultTile: number
    lastUpdate: number
}


export default function TentContainer({ tent }: { tent: Tribe }) {
    const forecasterItemsState: ForecasterItemsState = useForecasterSelector((state: ForecasterStore) => state.selectedForecastItems.find(x => x.tentId === tent.id)) || INITIAL_FORECAST_ITEMS_EXPANDED_STATE

    const dispatch = useForecasterDispatch()
    const onSelectedItemsChange = useCallback((e: any) => {
        dispatch(selectForecastItems(tent.id, e))
    }, [dispatch, tent.id])

    return (
        <div className='Tent'>
            <Header tentName={tent.name} />
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
                    <TacticalForecast tentId={tent.id} />
                </Item>
                <Item title='Strategic forecast' >
                    <StrategicForecast tentId={tent.id} />
                </Item>
            </Accordion>
        </div>
    )
}

function Header({ tentName }: { tentName: string }) {
    return <h3 className='TentHeader'> {tentName}</h3 >
}
