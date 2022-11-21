import React from 'react'
import Header from './header/Header'
import SetSettingsPanel from './settings_panel/SetSettingsPanel'
import Graph from './Graph'

export default function Set() {
    return (
        <div className='CustomersActivity_Set'>
            <Header />
            <SetSettingsPanel />
            <Graph />
        </div>
    )
}