import React, { useCallback } from 'react'
import { changePeriod } from '../../../store/multiset_container/Actions'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import RangePeriodSelector, { PeriodGroupBy } from '../../RangePeriodSelector'
import { useMultisetContainerContext } from '../MultisetContainerContext'

export default function PeriodSelector() {
    const context = useMultisetContainerContext()
    const rangeSelector = useCallback((store: MultisetContainerStore) => store.container.range, [])
    const groupBySelector = useCallback((store: MultisetContainerStore) => store.container.groupBy as PeriodGroupBy, [])
    return <RangePeriodSelector
        className='ComparisonGraph_PeriodSelector'
        rangeSelector={rangeSelector}
        groupBySelector={groupBySelector}
        onPeriodChange={changePeriod}
        fetchDataSource={context.graphSettingsPanel.fetchPeriod}
    />
}
