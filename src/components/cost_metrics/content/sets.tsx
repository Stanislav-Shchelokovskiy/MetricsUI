import React, { useCallback } from 'react'
import Set from './set/Set'
import { SettingsSets } from '../../common/components/multiset_container/MultisetContainer'


export default function Sets() {
    const setSelector = useCallback((state: any) => [], [])
    return <SettingsSets
        setsSelector={setSelector}
        set={Set} />
}
