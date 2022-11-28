import React from 'react'
import SetHeader from './header/SetHeader'
import SetSettingsPanel from './settings_panel/SetSettingsPanel'

export default function Set({ title }: { title: string }) {
    return (
        <div className='CustomersActivity_Set'>
            <SetHeader title={title} />
            <SetSettingsPanel title={title} />
        </div>
    )
}
