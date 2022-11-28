import './styles/CustomersActivityContainer.css'
import './styles/Menu.css'
import './styles/Set.css'
import './styles/SetsComparisonPanel.css'

import React from 'react'
import Menu from './menu/Menu'
import Sets from './content/Sets'
import SetsComparisonPanel from './sets_comparison_panel/SetsComparisonPanel'


export default function CustomersActivityContainer() {
    return (
        <div className='CustomersActivityContainer'>
            <Sets />
            <Menu />
            <SetsComparisonPanel />
        </div>
    )
}
