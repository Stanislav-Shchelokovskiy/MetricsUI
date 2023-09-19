import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Accordion, { Item } from 'devextreme-react/accordion'
import { Knot } from '../../common/Typing'
import { ForecasterStore } from '../store/Store'
import { expandForecastItems } from '../store/forecaster_items/Actions'
import { expandedItemsSelector } from '../store/forecaster_items/Selectors'
import TacticalForecast from '../tactical_forecast/TacticalForecast'
import StrategicForecast from '../strategic_forecast/StrategicForecast'
import { TentIdContext } from './TentContext'


export interface ForecastMainParams {
    tentId: string
    incomeType: string
    lastUpdate: number
}

export interface TribeContainerState {
    tent: Knot
    incomeType: string
    replyTypes: Array<string>
    defaultReplyType: string
    dailyForecastHorizons: Array<string>
    defaultDailyForecastHorizon: string
    tiles: Array<number>
    defaultTile: number
    lastUpdate: number
}


export default function TentContainer({ tent }: { tent: Knot }) {
    const expandedItems = useSelector((store: ForecasterStore) => expandedItemsSelector(store, tent.id))

    const dispatch = useDispatch()
    const onSelectedItemsChange = useCallback((e: any) => {
        dispatch(expandForecastItems(tent.id, e))
    }, [tent.id])
    return (
        <div className='Tent'>
            <Header tentName={tent.name} />
            <TentIdContext.Provider value={tent.id}>
                <Accordion
                    id='tribe_accordion'
                    collapsible={true}
                    multiple={true}
                    focusStateEnabled={false}
                    keyExpr='title'
                    defaultSelectedItemKeys={expandedItems}
                    onSelectedItemKeysChange={onSelectedItemsChange}
                >

                    <Item title='Tactical forecast'>
                        <TacticalForecast />
                    </Item>
                    <Item title='Strategic forecast' >
                        <StrategicForecast />
                    </Item>

                </Accordion>
            </TentIdContext.Provider>
        </div>
    )
}

function Header({ tentName }: { tentName: string }) {
    return <h3 className='TentHeader'> {tentName}</h3 >
}
