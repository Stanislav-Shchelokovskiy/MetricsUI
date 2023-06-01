import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import './styles/GraphSettingsPanel.css'

import React from 'react'
import { SUPPORT_METRICS_END_POINT } from '../common/EndPoint'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import Sets from './content/Sets'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import MultisetContainerContent from '../common/components/multiset_container/MultisetContainerContent'
import CostMetricsToolbar from './toolbar/Toolbar'
import GraphSettingsPanel from '../common/components/multiset_container/graph/GraphSettingsPanel'
import CostMetricsComparisonGraph from './ComparisonGraph'
import { fetchPeriod } from './network_resource_fetcher/Period'
import { fetchGroupByPeriods } from './network_resource_fetcher/GroupByPeriods'
import { fetchMetrics } from './network_resource_fetcher/Metrics'
import AggBySelector from './AggBySelector'

export function CostMetricsApplySharedState() {
    return <ApplySharedState
        endPoint={SUPPORT_METRICS_END_POINT}
        navigateTo='/CostMetrics'
    />
}

export default function CostMetrics() {
    return <MultisetContainer
        sets={Sets}
        toolbar={CostMetricsToolbar}
    >
        <MultisetContainerContent>
            <GraphSettingsPanel
                comparisonMethodSelectorClassName='CostMetrics_ComparisonMethodSelector'
                groupByPeriodSelectorClassName='CostMetrics_GroupByPeriodSelector'
                metricSelectorClassName='CostMetrics_MetricSelector'
                periodSelectorClassName='CostMetrics_PeriodSelector'
                fetchPeriod={fetchPeriod}
                fetchGroupByPeriods={fetchGroupByPeriods}
                fetchMetrics={fetchMetrics}>
                <AggBySelector />
            </GraphSettingsPanel>
            <CostMetricsComparisonGraph />
        </MultisetContainerContent>
    </MultisetContainer>
}
