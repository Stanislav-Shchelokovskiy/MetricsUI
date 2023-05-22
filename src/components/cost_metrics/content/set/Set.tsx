import React from 'react'
// import SetSettingsPanel from './settings_panel/SetSettingsPanel'
import SetWithHeader from '../../../common/components/multiset_container/set/Set'
import { SetProps } from '../../../common/components/multiset_container/MultisetContainer'

function Set({ setTitle }: SetProps) {
    return <SetWithHeader setTitle={setTitle}>
        <div>qwe</div>
        <div>asd</div>
        <div>qwe</div>
        <div>asd</div>
        <div>qwe</div>
        <div>asd</div>
    </SetWithHeader>
}

export default React.memo(Set)
