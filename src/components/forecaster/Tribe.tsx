import React from 'react'
import Accordion, { Item } from 'devextreme-react/accordion';
import TacticalForecast from './TacticalForecast'
import StrategicForecast from './StrategicForecast'
import { ForecastSettingsValues } from './Tribes'

export interface Tribe {
    id: string
    name: string
}

export interface TribeID {
    tribeID: string
}


function Header({ tribeName }: { tribeName: string }) {
    return <h3 className='TribeHeader'> {tribeName}</h3 >
}

export default function TribeContainer({ tribe, replyTypes, forecastHorizons, tiles }: { tribe: Tribe } & ForecastSettingsValues) {
    return (
        <div className='Tribe'>
            <Header tribeName={tribe.name} />
            <Accordion
                collapsible={true}
                multiple={true}
                focusStateEnabled={false}>
                <Item title='Tactical forecast'>
                    <TacticalForecast
                        tribeID={tribe.id}
                        replyTypes={replyTypes} />
                </Item>
                <Item title='Strategic forecast'>
                    <StrategicForecast
                        tribeID={tribe.id}
                        forecastHorizons={forecastHorizons}
                        tiles={tiles} />
                </Item>
            </Accordion>

        </div>
    )

}
