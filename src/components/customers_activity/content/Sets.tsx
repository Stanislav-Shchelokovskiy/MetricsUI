import React, { useCallback } from 'react'
import Set from './set/Set'
import { CustomersActivityStore } from '../store/Store'
import { SettingsSets } from '../../common/components/multiset_container/MultisetContainer'

export default function Sets() {
    const setSelector = useCallback((state: CustomersActivityStore) => state.customersActivity.sets, [])
    return <SettingsSets
        setsSelector={setSelector}
        set={Set} />
}
