import React, { useCallback, useMemo } from 'react'
import Accordion, { Item } from 'devextreme-react/accordion'
import TacticalForecast, { TacticalForecastState } from './TacticalForecast'
import StrategicForecast, { StrategicForecastState } from './StrategicForecast'
import getValueFromStoreOrDefault, { saveValueToStore } from './utils/LocalStorage'

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

    // const tacticalForecastState = useMemo<TacticalForecastState>(() => {
    //     return {
    //         tribeID: state.tribe.id,
    //         incomeType: state.incomeType,
    //         lastUpdate: state.lastUpdate,
    //         replyTypes: state.replyTypes,
    //         replyType: state.defaultReplyType
    //     }
    // }, [
    //     state.tribe.id,
    //     state.incomeType,
    //     state.replyTypes,
    //     state.defaultReplyType,
    //     state.lastUpdate
    // ])

    // const strategicForecastState = useMemo<StrategicForecastState>(() => {
    //     return {
    //         tribeID: state.tribe.id,
    //         incomeType: state.incomeType,
    //         lastUpdate: state.lastUpdate,
    //         forecastHorizons: state.dailyForecastHorizons,
    //         forecastHorizon: state.defaultDailyForecastHorizon,
    //         tiles: state.tiles,
    //         tile: state.defaultTile
    //     }
    // }, [
    //     state.tribe.id,
    //     state.incomeType,
    //     state.dailyForecastHorizons,
    //     state.defaultDailyForecastHorizon,
    //     state.tiles,
    //     state.defaultTile,
    //     state.lastUpdate
    // ])


    const itemsKey = `${tribe.id}_selected_items`
    const selectedItems = getValueFromStoreOrDefault(itemsKey, [])

    const onSelectedItemsChange = useCallback((e: any) => {
        saveValueToStore(itemsKey, e)
    }, [itemsKey])

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
                    <StrategicForecast tribeId={tribe.id}/>
                </Item>
            </Accordion>
        </div>
    )
}
