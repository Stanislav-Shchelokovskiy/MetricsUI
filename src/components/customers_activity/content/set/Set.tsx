import React from 'react'
import SetHeader from './header/SetHeader'
import SetSettingsPanel from './settings_panel/SetSettingsPanel'


export default function Set({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_Set'>
            <SetHeader setTitle={setTitle} />
            <SetSettingsPanel setTitle={setTitle} />
        </div>
    )
}
