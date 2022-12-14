import React from 'react'
import SetSettingsPanel from './settings_panel/SetSettingsPanel'
import CatPanel from './cat_panel/CatPanel'
import SetHeader from '../set/header/SetHeader'

export default function Set({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_Set' id='CustomersActivity_Set'>
            <SetHeader setTitle={setTitle} />
            <SetSettingsPanel setTitle={setTitle} />
            <CatPanel setTitle={setTitle} />
        </div>
    )
}
