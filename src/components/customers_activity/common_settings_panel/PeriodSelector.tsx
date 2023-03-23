import React, { useCallback } from 'react'
import { changePeriod } from '../store/actions/Common'
import { CustomersActivityStore } from '../store/Store'
import { fetchPeriod } from '../network_resource_fetcher/FetchPeriod'
import RangePeriodSelector, { PeriodGroupBy } from '../../common/components/RangePeriodSelector'


export default function PeriodSelector() {
    const rangeSelector = useCallback((store: CustomersActivityStore) => store.customersActivity.range, [])
    const groupBySelector = useCallback((store: CustomersActivityStore) => store.customersActivity.groupByPeriod as PeriodGroupBy, [])
    return <RangePeriodSelector
        className='CustomersActivity_PeriodSelector'
        rangeSelector={rangeSelector}
        groupBySelector={groupBySelector}
        onPeriodChange={changePeriod}
        fetchDataSource={fetchPeriod}
    />
}
