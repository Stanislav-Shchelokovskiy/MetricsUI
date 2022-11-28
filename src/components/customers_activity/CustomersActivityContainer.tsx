import './styles/CustomersActivityContainer.css'
import './styles/CommonSettingsPanel.css'
import './styles/Set.css'

import React from 'react'
import CommonSettingsPanel from './commonSettingsPanel/CommonSettingsPanel'
import Sets from './content/Sets'
import ComparisonGraph from './ComparisonGraph'


export default function CustomersActivityContainer() {
    return (
        <div className='CustomersActivityContainer'>
            <Sets />
            <CommonSettingsPanel />
            <ComparisonGraph />
        </div>
    )
}
