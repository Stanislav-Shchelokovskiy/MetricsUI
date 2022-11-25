import React from 'react'
import PeriodSelector from './PeriodSelector'
import GroupByPeriodSelector from './GroupByPeriodSelector'
import MetricSelector from './MetricSelector'



function CommonSettingsPanel() {

    return (
        <div className='CustomersActivity_CommonSettingsPanel'>
            <PeriodSelector />
            <GroupByPeriodSelector />
            <MetricSelector />
        </div>
    )
}

export default React.memo(CommonSettingsPanel)
