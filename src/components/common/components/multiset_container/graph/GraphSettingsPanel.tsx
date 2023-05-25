import React from 'react'
import PeriodSelector from './PeriodSelector'
import GroupByPeriodSelector from './GroupByPeriodSelector'
import MetricSelector from './MetricSelector'
import ComparisonMethodSelector from './ComparisonMethodSelector'


function GraphSettingsPanel() {
    return (
        <div className='ComparisonGraph_SettingsPanel'>
            <PeriodSelector />
            <GroupByPeriodSelector />
            <MetricSelector />
            <ComparisonMethodSelector />
        </div>
    )
}

export default React.memo(GraphSettingsPanel)
