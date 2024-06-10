import React from 'react'
import PeriodSelector from './PeriodSelector'
import GroupBySelector from './GroupBySelector'
import MetricSelector from './metric_selector/MetricSelector'
import ComparisonMethodSelector from './ComparisonMethodSelector'

export default function GraphSettingsPanel() {
    return (
        <div className='ComparisonGraph_SettingsPanel'>
            <PeriodSelector />
            <GroupBySelector />
            <MetricSelector />
            <ComparisonMethodSelector />
        </div>
    )
}
