import React from 'react'
import Accordion, { Item } from 'devextreme-react/accordion';
import TacticalForecast from './TacticalForecast'
import StrategicForecast from './StrategicForecast'

interface TribeData {
    name: string
}


function Header({ name }: TribeData) {
    return <h3 className='TribeHeader'> { name }</h3 >
}

function Tribe({ name }: TribeData) {
    return (
        <div className='Tribe'>
            <Header name={name} />
            <Accordion
                collapsible={true}
                multiple={true}
                focusStateEnabled={false}>
                <Item title="Tactical forecast"><TacticalForecast /></Item>
                <Item title="Strategic forecast"><StrategicForecast /></Item>
            </Accordion>

        </div>
    )

}

export default Tribe