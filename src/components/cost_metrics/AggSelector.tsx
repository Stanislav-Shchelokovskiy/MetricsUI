import React, { useMemo } from 'react'
import OptionSelector from '../common/components/OptionSelector'
import { MultisetContainerStore } from '../common/store/multiset_container/Store'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import { changeComparisonMethod } from '../common/store/multiset_container/Actions'


export default function AggSelector() {
    const valueSelector = (store: MultisetContainerStore<BaseContainerState>) => store.container.comparisonMethod
    const ds = useMemo(() => ['emp', 'tribe', 'chapter'], [])
    return (
        <OptionSelector
            className='CostMetrics_AggSelector'
            dataSource={ds}
            valueSelector={valueSelector}
            onValueChange={changeComparisonMethod}
            label='Agg by' />
    )
}
