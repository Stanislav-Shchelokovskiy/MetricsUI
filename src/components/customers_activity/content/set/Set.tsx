import React from 'react'
import SetSettingsPanel from './settings_panel/SetSettingsPanel'
import SetHeader from '../set/header/SetHeader'

function Set({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_Set' id='CustomersActivity_Set'>
            <SetHeader setTitle={setTitle} />
            <SetSettingsPanel setTitle={setTitle} />
        </div>
    )
}

export default React.memo(Set)
