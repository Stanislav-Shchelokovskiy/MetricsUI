import React, { useCallback } from 'react'
import Set from './set/Set'
import {CostMetricsStore} from '../store/Store'
import { SettingsSets } from '../../common/components/multiset_container/MultisetContainer'


export default function Sets() {
    const setSelector = useCallback((state: CostMetricsStore) => state.container.sets, [])
    return <SettingsSets
        setsSelector={setSelector}
        set={Set} />
}
