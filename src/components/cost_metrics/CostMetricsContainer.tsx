import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import { SUPPORT_METRICS_END_POINT } from '../common/EndPoint'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import Sets from './content/Sets'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import MultisetContainerContent from '../common/components/multiset_container/MultisetContainerContent'
import CostMetricsToolbar from './toolbar/Toolbar'
import GraphSettingsPanel from '../common/components/multiset_container/graph/GraphSettingsPanel'
import CostMetricsComparisonGraph from './ComparisonGraph'
import { fetchPeriod } from './network_resource_fetcher/FetchPeriod'
import { fetchGroupByPeriods } from './network_resource_fetcher/FetchGroupByPeriods'
import { fetchMetrics } from './network_resource_fetcher/FetchMetrics'

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
                fetchPeriod={fetchPeriod}
                fetchGroupByPeriods={fetchGroupByPeriods}
                fetchMetrics={fetchMetrics} />
            <CostMetricsComparisonGraph />
        </MultisetContainerContent>
    </MultisetContainer>
}
