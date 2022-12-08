import React from 'react'
import SetSettingsPanel from './settings_panel/SetSettingsPanel'
import CatPanel from './cat_panel/CatPanel'


export default function Set({ setTitle }: { setTitle: string }) {
    return (
        <div className='CustomersActivity_Set'>
            <SetSettingsPanel setTitle={setTitle} />
            <CatPanel setTitle={setTitle} />
        </div>
    )
}
