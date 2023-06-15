import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import { SUPPORT_METRICS_END_POINT } from '../common/EndPoint'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import { fetchPeriod } from './network_resource_fetcher/Period'
import { fetchGroupByPeriods } from './network_resource_fetcher/GroupByPeriods'
import { fetchMetrics } from './network_resource_fetcher/Metrics'
import { fetchPeriodsArray } from './network_resource_fetcher/PeriodsArray'
import { fetchCostMetricsAggregates } from './network_resource_fetcher/CostMetricsAggregates'
import { getShareableState } from '../common/store/multiset_container/Store'
import { fetchCostMetricsRaw } from './network_resource_fetcher/CostMetricsRaw'
import { fetchDisplayFilter } from '../cost_metrics/network_resource_fetcher/DisplayFilter'

import Sets from './content/Sets'
import CostMetricsToolbar from './toolbar/Toolbar'

const graphSettings = {
    fetchPeriod: fetchPeriod,
    fetchGroupByPeriods: fetchGroupByPeriods,
}

const graph = {
    fetchPeriods: fetchPeriodsArray,
    fetchAggs: fetchCostMetricsAggregates,
    containerDepsSelector: (containerState: BaseContainerState) => [],
}

const stateManagement = {
    shareableStateSelector: getShareableState,
    stateSalt: 'CostMetrics_',
    endPoint: SUPPORT_METRICS_END_POINT,
    navigateTo: '/CostMetrics',
}

const rawData = {
    fetchRawData: fetchCostMetricsRaw
}

const filterLabel = {
    fetchDisplayFilter: fetchDisplayFilter
}

export const costMetricsContext = {
    graphSettingsPanel: graphSettings,
    graph: graph,
    stateManagement: stateManagement,
    rawData: rawData,
    filterLabel: filterLabel,
    fetchMetrics: fetchMetrics,
    changeContext: (ctx: any) => { },
}

export function CostMetricsApplySharedState() {
    return <ApplySharedState />
}

export default function CostMetrics() {
    return <MultisetContainerContext.Provider value={costMetricsContext}>
        <MultisetContainer
            sets={Sets}
            toolbar={CostMetricsToolbar}
        />
    </MultisetContainerContext.Provider>
}
