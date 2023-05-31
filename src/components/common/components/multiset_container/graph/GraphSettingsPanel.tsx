import React, { PropsWithChildren } from 'react'
import PeriodSelector, { Props as PeriodSelectorProps } from './PeriodSelector'
import GroupByPeriodSelector, { Props as GroupByPeriodSelectorProps } from './GroupByPeriodSelector'
import MetricSelector, { Props as MetricSelectorProps } from './MetricSelector'
import ComparisonMethodSelector, { Props as ComparisonMethodSelectorProps } from './ComparisonMethodSelector'

type GraphSettingsPanelProps = PeriodSelectorProps & GroupByPeriodSelectorProps & MetricSelectorProps & ComparisonMethodSelectorProps

function GraphSettingsPanel(props: PropsWithChildren<GraphSettingsPanelProps>) {
    return (
        <div className='ComparisonGraph_SettingsPanel'>
            <PeriodSelector {...props} />
            <GroupByPeriodSelector {...props} />
            <MetricSelector {...props} />
            {props.children}
            <ComparisonMethodSelector {...props} />
        </div>
    )
}

export default React.memo(GraphSettingsPanel)

GraphSettingsPanel.defaultProps = {
    comparisonMethodSelectorClassName: 'ComparisonGraph_ComparisonMethodSelector',
    groupByPeriodSelectorClassName: 'ComparisonGraph_GroupByPeriodSelector',
    metricSelectorClassName: 'ComparisonGraph_MetricSelector',
    periodSelectorClassName: 'ComparisonGraph_PeriodSelector',
}
