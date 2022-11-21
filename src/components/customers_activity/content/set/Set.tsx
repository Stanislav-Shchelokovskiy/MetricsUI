import React from 'react'
import SetHeader from './header/SetHeader'
import SetSettingsPanel from './settings_panel/SetSettingsPanel'
import SetGraph from './SetGraph'

export default function Set() {
    return (
        <div className='CustomersActivity_Set'>
            <SetHeader />
            <SetSettingsPanel />
            <SetGraph />
        </div>
    )
}
