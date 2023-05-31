import React, { useCallback } from 'react'
import FetchResult from '../../../Interfaces'
import { changePeriod } from '../../../store/multiset_container/Actions'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import RangePeriodSelector, { PeriodGroupBy } from '../../RangePeriodSelector'

type Period = [string, string]

export interface Props {
    periodSelectorClassName: string | undefined
    fetchPeriod: (...args: any) => Promise<FetchResult<Period>>
}

export default function PeriodSelector(props: Props) {
    const rangeSelector = useCallback((store: MultisetContainerStore) => store.container.range, [])
    const groupBySelector = useCallback((store: MultisetContainerStore) => store.container.groupByPeriod as PeriodGroupBy, [])
    return <RangePeriodSelector
        className={props.periodSelectorClassName}
        rangeSelector={rangeSelector}
        groupBySelector={groupBySelector}
        onPeriodChange={changePeriod}
        fetchDataSource={props.fetchPeriod}
    />
}
