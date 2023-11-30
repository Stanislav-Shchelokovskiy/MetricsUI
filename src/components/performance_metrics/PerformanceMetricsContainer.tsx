import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import { PERFORMANCE_METRICS_END_POINT } from '../common/EndPoint'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import { BaseContainerState, advancedSettingsModified } from '../common/store/multiset_container/BaseContainerState'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import { fetchPeriod } from './network_resource_fetcher/Period'
import { fetchMetrics, fetchMetricDesc } from './network_resource_fetcher/Metrics'
import { fetchPeriods } from './network_resource_fetcher/Periods'
import { fetchAggregates } from './network_resource_fetcher/Aggregates'
import { fetchRaw } from './network_resource_fetcher/Raw'
import { fetchDisplayFilter } from './network_resource_fetcher/DisplayFilter'
import { fetchGroupBys } from './network_resource_fetcher/GroupBy'
import { CONTEXT } from './store/ContainerReducer'
import Sets from './content/Sets'
import PerformanceMetricsToolbar from './toolbar/Toolbar'
import { PERFORMANCE_METRICS } from '../app_components/Paths'
import { getSetDataFields } from './store/sets/SetDescriptor'
import { MultisetContainerStore } from '../common/store/multiset_container/Store'

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

const advancedSettings = {
    modified: (store: MultisetContainerStore) => {
        return advancedSettingsModified(store.container)
    }
}

export const performanceMetricsContext = {
    graphSettingsPanel: graphSettings,
    graph: graph,
    stateManagement: stateManagement,
    rawData: rawData,
    filterLabel: filterLabel,
    metricDescription: metricDescription,
    advancedSettings: advancedSettings,
    fetchMetrics: fetchMetrics,
    changeMetric: (ctx: any) => { },
    changeState: (state: any) => { },
    context: CONTEXT,
    orientation: undefined,
    xName: 'Period',
    yName: 'Value',
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
