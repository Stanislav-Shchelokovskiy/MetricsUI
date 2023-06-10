import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import { SUPPORT_METRICS_END_POINT } from '../common/EndPoint'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import Sets from './content/Sets'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import CostMetricsToolbar from './toolbar/Toolbar'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import { fetchPeriod } from './network_resource_fetcher/Period'
import { fetchGroupByPeriods } from './network_resource_fetcher/GroupByPeriods'
import { fetchMetrics } from './network_resource_fetcher/Metrics'
import { fetchPeriodsArray } from './network_resource_fetcher/PeriodsArray'
import { fetchCostMetricsAggregates } from './network_resource_fetcher/CostMetricsAggregates'

export function CostMetricsApplySharedState() {
    return <ApplySharedState
        endPoint={SUPPORT_METRICS_END_POINT}
        navigateTo='/CostMetrics'
    />
}

const graphSettingsContext = {
    fetchPeriod: fetchPeriod,
    fetchGroupByPeriods: fetchGroupByPeriods,
    fetchMetrics: fetchMetrics,
}

const graphContext = {
    fetchPeriods: fetchPeriodsArray,
    fetchAggs: fetchCostMetricsAggregates,
    containerDepsSelector: (containerState: BaseContainerState) => [],
}

const multisetContainerContext = {
    graphSettingsPanel: graphSettingsContext,
    graph: graphContext,
}

export default function CostMetrics() {
    return <MultisetContainerContext.Provider value={multisetContainerContext}>
        <MultisetContainer
            sets={Sets}
            toolbar={CostMetricsToolbar}
        />
    </MultisetContainerContext.Provider>
}
