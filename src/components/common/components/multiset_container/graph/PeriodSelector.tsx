import React, { useCallback } from 'react'
import { changePeriod } from '../../../../customers_activity/store/actions/Common'
import { CustomersActivityStore } from '../../../../customers_activity/store/Store'
import { fetchPeriod } from '../../../../customers_activity/network_resource_fetcher/FetchPeriod'
import RangePeriodSelector, { PeriodGroupBy } from '../../RangePeriodSelector'


export default function PeriodSelector() {
    const rangeSelector = useCallback((store: CustomersActivityStore) => store.customersActivity.range, [])
    const groupBySelector = useCallback((store: CustomersActivityStore) => store.customersActivity.groupByPeriod as PeriodGroupBy, [])
    return <RangePeriodSelector
        className='ComparisonGraph_PeriodSelector'
        rangeSelector={rangeSelector}
        groupBySelector={groupBySelector}
        onPeriodChange={changePeriod}
        fetchDataSource={fetchPeriod}
    />
}
