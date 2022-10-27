import React from 'react'
import Accordion, { Item } from 'devextreme-react/accordion'
import TacticalForecast from './TacticalForecast'
import StrategicForecast from './StrategicForecast'
import { ForecastSettingsValues } from './Tribes'

export interface Tribe {
    id: string
    name: string
}

export interface ForecastParams {
    tribeID: string
    incomeType: string
}

function Header({ tribeName }: { tribeName: string }) {
    return <h3 className='TribeHeader'> {tribeName}</h3 >
}

export default function TribeContainer(
    {
        tribe,
        incomeType,
        replyTypes,
        forecastHorizons,
        tiles
    }:
        { tribe: Tribe } &
        { incomeType: string } &
        ForecastSettingsValues
) {
    return (
        <div className='Tribe'>
            <Header tribeName={tribe.name} />
            <Accordion
                id='tribe_accordion'
                collapsible={true}
                multiple={true}
                focusStateEnabled={false}>
                <Item title='Tactical forecast'>
                    <TacticalForecast
                        tribeID={tribe.id}
                        incomeType={incomeType}
                        replyTypes={replyTypes} />
                </Item>
                <Item title='Strategic forecast'>
                    <StrategicForecast
                        tribeID={tribe.id}
                        incomeType={incomeType}
                        forecastHorizons={forecastHorizons}
                        tiles={tiles} />
                </Item>
            </Accordion>

        </div>
    )

}
