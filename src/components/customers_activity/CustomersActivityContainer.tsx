import './styles/CustomersActivityContainer.css'
import './styles/CommonSettingsPanel.css'
import './styles/Set.css'

import React, { useState } from 'react'
import Drawer from 'devextreme-react/drawer'
import Toolbar from 'devextreme-react/toolbar'
import CommonSettingsPanel from './commonSettingsPanel/CommonSettingsPanel'
import Sets from './content/Sets'
import ComparisonGraph from './ComparisonGraph'


export default function CustomersActivityContainer() {
    const [opened, setOpened] = useState(false)
    return (
        <div className='CustomersActivityContainer'>
            <Toolbar
                className='CustomersActivityToolbar'
                items={[{
                    widget: 'dxButton',
                    location: 'before',
                    options: {
                        icon: 'menu',
                        onClick: () => setOpened(!opened),
                    },
                }]} />
            <Drawer
                className='CustomersActivity_ContentDrawer'
                opened={opened}
                openedStateMode='overlap'
                position='top'
                revealMode='slide'
                component={Sets}
                closeOnOutsideClick={true}>
                <div className='CustomersActivityContent'>
                    <CommonSettingsPanel />
                    <ComparisonGraph />
                </div>
            </Drawer >
        </div >
    )
}
