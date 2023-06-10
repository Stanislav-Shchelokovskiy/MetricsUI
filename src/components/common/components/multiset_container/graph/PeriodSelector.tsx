import React, { useCallback, useContext } from 'react'
import { changePeriod } from '../../../store/multiset_container/Actions'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import RangePeriodSelector, { PeriodGroupBy } from '../../RangePeriodSelector'
import { MultisetContainerContext } from '../MultisetContainerContext'

export default function PeriodSelector() {
    const context = useContext(MultisetContainerContext)
    const rangeSelector = useCallback((store: MultisetContainerStore) => store.container.range, [])
    const groupBySelector = useCallback((store: MultisetContainerStore) => store.container.groupByPeriod as PeriodGroupBy, [])
    return <RangePeriodSelector
        className='ComparisonGraph_PeriodSelector'
        rangeSelector={rangeSelector}
        groupBySelector={groupBySelector}
        onPeriodChange={changePeriod}
        fetchDataSource={context.graphSettingsPanel.fetchPeriod}
    />
}
