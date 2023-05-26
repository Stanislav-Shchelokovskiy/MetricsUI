import React from 'react'
import PeriodSelector, {Props as PeriodSelectorProps} from './PeriodSelector'
import GroupByPeriodSelector, {Props as GroupByPeriodSelectorProps} from './GroupByPeriodSelector'
import MetricSelector from './MetricSelector'
import ComparisonMethodSelector from './ComparisonMethodSelector'

type GraphSettingsPanelProps = PeriodSelectorProps & GroupByPeriodSelectorProps

function GraphSettingsPanel(props: GraphSettingsPanelProps) {
    return (
        <div className='ComparisonGraph_SettingsPanel'>
            <PeriodSelector fetchPeriod={props.fetchPeriod} />
            <GroupByPeriodSelector fetchGroupByPeriods={props.fetchGroupByPeriods} />
            <MetricSelector />
            <ComparisonMethodSelector />
        </div>
    )
}

export default React.memo(GraphSettingsPanel)
