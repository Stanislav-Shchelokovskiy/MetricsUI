import React, { useCallback } from 'react'
import Accordion, { Item } from 'devextreme-react/accordion'
import TacticalForecast from './tacticalForecast/TacticalForecast'
import StrategicForecast from './strategicForecast/StrategicForecast'
import { useForecasterSelector, ForecasterStore, useForecasterDispatch } from './store/ForecasterStore'
import { selectForecastItems } from './store/Actions'

export interface Tribe {
    id: string
    name: string
}

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

function Header({ tribeName }: { tribeName: string }) {
    return <h3 className='TribeHeader'> {tribeName}</h3 >
}

export default function TribeContainer({ tribe }: { tribe: Tribe }) {
    const selectedItems: Array<string> = useForecasterSelector((state: ForecasterStore) => state.selectedForecastItems)

    const dispatch = useForecasterDispatch()
    const onSelectedItemsChange = useCallback((e: any) => {
        dispatch(selectForecastItems(e))
    }, [dispatch])

    return (
        <div className='Tribe'>
            <Header tribeName={tribe.name} />
            <Accordion
                id='tribe_accordion'
                collapsible={true}
                multiple={true}
                focusStateEnabled={false}
                keyExpr='title'
                defaultSelectedItemKeys={selectedItems}
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
