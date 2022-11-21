import './styles/CommonSettingsPanel.css'
import './styles/Tribes.css'
import './styles/Tribe.css'
import './styles/Forecast.css'
import './styles/Menu.css'
import './styles/CommandPanel.css'

import React from 'react'

import TribesContainer from './Tribes'
import ForecasterCommonSettingsPanel from './menu/commonSettingsPanel/CommonSettingsPanel'
import ForecasterCommandPanel from './menu/commandPanel.tsx/CommandPanel'


export default function Forecaster() {

    return (
        <div className='Forecaster' >
            <div className='ForecasterMenu' >
                <ForecasterCommonSettingsPanel />
                <ForecasterCommandPanel />
            </div>
            <TribesContainer />
        </div>
    )
}
