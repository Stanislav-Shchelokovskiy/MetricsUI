import './styles/CommonSettingsPanel.css'
import './styles/Tents.css'
import './styles/Tent.css'
import './styles/Forecast.css'
import './styles/Menu.css'
import './styles/CommandPanel.css'

import React from 'react'
import TentsContainer from './Tents'
import ForecasterCommonSettingsPanel from './menu/commonSettingsPanel/CommonSettingsPanel'
import ForecasterCommandPanel from './menu/commandPanel/CommandPanel'


export default function Forecaster() {
    return (
        <div className='Forecaster' >
            <div className='ForecasterMenu' >
                <ForecasterCommonSettingsPanel />
                <ForecasterCommandPanel />
            </div>
            <TentsContainer />
        </div>
    )
}
