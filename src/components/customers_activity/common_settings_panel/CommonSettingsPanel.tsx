import React from 'react'
import PeriodSelector from './PeriodSelector'
import GroupByPeriodSelector from './GroupByPeriodSelector'
import MetricSelector from './MetricSelector'
import ComparisonMethodSelector from './ComparisonMethodSelector'


function CommonSettingsPanel() {
    return (
        <div className='CustomersActivity_CommonSettingsPanel'>
            <PeriodSelector />
            <GroupByPeriodSelector />
            <MetricSelector />
            <ComparisonMethodSelector />
        </div>
    )
}

export default React.memo(CommonSettingsPanel)
