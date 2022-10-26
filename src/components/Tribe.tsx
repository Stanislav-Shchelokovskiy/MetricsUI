import React from 'react'
import TacticalForecast from './forecasts/TacticalForecast'
import StrategicForecast from './forecasts/StrategicForecast'

interface TribeData {
    name: string
}


function Header({ name }: TribeData) {
    return <h1>{name}</h1>
}

function Tribe({ name }: TribeData) {
    return (
        <div className='Tribe'>
            <Header name={name} />
            <TacticalForecast />
            <StrategicForecast />
        </div>
    )

}

export default Tribe