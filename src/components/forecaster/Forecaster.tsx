import './styles/CommonSettingsPanel.css'
import './styles/Tribes.css'
import './styles/Tribe.css'
import './styles/Forecast.css'
import './styles/Menu.css'
import './styles/CommandPanel.css'

import React from 'react'

import TribesContainer from './Tribes'
import CommonSettingsPanel from './menu/CommonSettingsPanel'
import CommandPanel from './menu/CommandPanel'


export default function Forecaster() {
    return (
        <div className='Forecaster' >
            <div data-testid='Menu' className='Menu' >
                <CommonSettingsPanel />
                <CommandPanel />
            </div>
            <TribesContainer />
        </div>
    )
}
