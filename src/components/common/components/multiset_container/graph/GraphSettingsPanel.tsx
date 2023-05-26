import React from 'react'
import PeriodSelector from './PeriodSelector'
import GroupByPeriodSelector from './GroupByPeriodSelector'
import MetricSelector from './MetricSelector'
import ComparisonMethodSelector from './ComparisonMethodSelector'
import { fetchGroupByPeriods } from '../../../../customers_activity/network_resource_fetcher/FetchGroupByPeriods'
import { fetchPeriod } from '../../../../customers_activity/network_resource_fetcher/FetchPeriod'


function GraphSettingsPanel() {
    return (
        <div className='ComparisonGraph_SettingsPanel'>
            <PeriodSelector fetchPeriod={fetchPeriod} />
            <GroupByPeriodSelector fetchGroupByPeriods={fetchGroupByPeriods} />
            <MetricSelector />
            <ComparisonMethodSelector />
        </div>
    )
}

export default React.memo(GraphSettingsPanel)
