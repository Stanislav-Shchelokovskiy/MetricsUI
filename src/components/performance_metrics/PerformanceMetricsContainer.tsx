import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import { PERFORMANCE_METRICS_END_POINT } from '../common/EndPoint'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import { fetchPeriod } from './network_resource_fetcher/Period'
import { fetchMetrics, fetchMetricDesc } from './network_resource_fetcher/Metrics'
import { fetchPeriodsArray } from './network_resource_fetcher/PeriodsArray'
import { fetchAggregates } from './network_resource_fetcher/Aggregates'
import { getShareableState } from './store/Store'
import { fetchRaw } from './network_resource_fetcher/Raw'
import { fetchDisplayFilter } from './network_resource_fetcher/DisplayFilter'
import { fetchGroupByPeriods } from './network_resource_fetcher/GroupByPeriods'
import { CONTEXT } from './store/ContainerReducer'
import Sets from './content/Sets'
import PerformanceMetricsToolbar from './toolbar/Toolbar'
import { PERFORMANCE_METRICS } from '../app_components/Paths'
import { getSetDataFields } from './store/sets/SetDescriptor'

const graphSettings = {
    fetchPeriod: fetchPeriod,
    fetchGroupByPeriods: fetchGroupByPeriods,
}

const graph = {
    fetchPeriods: fetchPeriodsArray,
    fetchAggs: fetchAggregates,
    containerDepsSelector: (containerState: BaseContainerState) => [''],
}

const stateManagement = {
    getShareableState: getShareableState,
    endPoint: PERFORMANCE_METRICS_END_POINT,
    navigateTo: PERFORMANCE_METRICS,
}

const rawData = {
    fetchRawData: fetchRaw
}

const filterLabel = {
    fetchDisplayFilter: fetchDisplayFilter,
    getFilterFields: getSetDataFields,
}

const metricDescription = {
    fetchMetricDescription: fetchMetricDesc,
}

export const performanceMetricsContext = {
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
}

export function PerformanceMetricsApplySharedState() {
    return <ApplySharedState />
}

export default function PerformanceMetrics() {
    return <MultisetContainerContext.Provider value={performanceMetricsContext}>
        <MultisetContainer
            sets={Sets}
            toolbar={PerformanceMetricsToolbar}
        />
    </MultisetContainerContext.Provider>
}
