import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import { COST_METRICS_END_POINT } from '../common/EndPoint'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import { fetchPeriod } from './network_resource_fetcher/Period'
import { fetchGroupBys } from './network_resource_fetcher/GroupBy'
import { fetchMetrics, fetchMetricDesc } from './network_resource_fetcher/Metrics'
import { fetchPeriods } from './network_resource_fetcher/Periods'
import { fetchAggregates } from './network_resource_fetcher/Aggregates'
import { fetchCostMetricsRaw } from './network_resource_fetcher/Raw'
import { fetchDisplayFilter } from '../cost_metrics/network_resource_fetcher/DisplayFilter'
import { CONTEXT } from './store/ContainerReducer'
import Sets from './content/Sets'
import CostMetricsToolbar from './toolbar/Toolbar'
import { COST_METRICS } from '../app_components/Paths'
import { getSetDataFields } from './store/sets/SetDescriptor'

const graphSettings = {
    fetchPeriod: fetchPeriod,
    fetchGroupBys: fetchGroupBys,
}

const graph = {
    fetchPeriods: fetchPeriods,
    fetchAggs: fetchAggregates,
    containerDepsSelector: (containerState: BaseContainerState) => [''],
}

const stateManagement = {
    getShareableState: () => { },
    endPoint: COST_METRICS_END_POINT,
    navigateTo: COST_METRICS,
}

const rawData = {
    fetchRawData: fetchCostMetricsRaw
}

const filterLabel = {
    fetchDisplayFilter: fetchDisplayFilter,
    getFilterFields: getSetDataFields,
}

const metricDescription = {
    fetchMetricDescription: fetchMetricDesc,
}

export const costMetricsContext = {
    graphSettingsPanel: graphSettings,
    graph: graph,
    stateManagement: stateManagement,
    rawData: rawData,
    filterLabel: filterLabel,
    metricDescription: metricDescription,
    fetchMetrics: fetchMetrics,
    changeMetric: (ctx: any) => { },
    changeState: (state: any) => { },
    context: CONTEXT,
    orientation: undefined,
    xName: 'Period',
    yName: 'Value',
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
