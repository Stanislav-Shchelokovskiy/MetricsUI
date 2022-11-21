import './styles/CustomersActivityContainer.css'
import './styles/Menu.css'
import './styles/SetHeader.css'
import './styles/SetSettingsPanel.css'
import './styles/Set.css'
import './styles/SetsComparisonPanel.css'

import React from 'react'
import Menu from './menu/Menu'
import CustomersActivityContent from './content/CustomersActivityContent'


export default function CustomersActivityContainer() {
    return (
        <div className='CustomersActivityContainer'>
            <Menu />
            <CustomersActivityContent />
        </div>
    )
}