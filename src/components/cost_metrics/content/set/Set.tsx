import React from 'react'
// import SetSettingsPanel from './settings_panel/SetSettingsPanel'
// import SetHeader from '../set/header/SetHeader'
import { SetProps } from '../../../common/components/multiset_container/MultisetContainer'

function Set({ setTitle }: SetProps) {
    return (
        <div className='CustomersActivity_Set' id='CustomersActivity_Set'>
            {/* <SetHeader setTitle={setTitle} />
            <SetSettingsPanel setTitle={setTitle} /> */}
        </div>
    )
}

export default React.memo(Set)
