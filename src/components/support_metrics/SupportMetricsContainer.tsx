import './styles/Set.css'
import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import Sets from './content/Sets'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import SupportMetricsToolbar from './toolbar/Toolbar'
import { ContainerState, CONTEXT } from './store/ContainerReducer'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import { fetchGroupByPeriods } from './network_resource_fetcher/GroupByPeriods'
import { fetchPeriod } from './network_resource_fetcher/Period'
import { fetchMetrics, fetchMetricDesc } from './network_resource_fetcher/Metrics'
import { fetchPeriods } from './network_resource_fetcher/Periods'
import { fetchAggregates } from './network_resource_fetcher/Aggregates'
import { SUPPORT_METRICS_END_POINT } from '../common/EndPoint'
import { getShareableState } from './store/Store'
import { fetchTicketsWithIterationsRaw } from './network_resource_fetcher/Raw'
import { fetchDisplayFilter } from './network_resource_fetcher/DisplayFilter'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import { SUPPORT_METRICS } from '../app_components/Paths'
import { getSetDataFields } from './store/sets/SetDescriptor'


const graphSettings = {
    fetchPeriod: fetchPeriod,
    fetchGroupByPeriods: fetchGroupByPeriods,
}

const graph = {
    fetchPeriods: fetchPeriods,
    fetchAggs: fetchAggregates,
    containerDepsSelector: (containerState: BaseContainerState) => [(containerState as ContainerState).baselineAlignedModeEnabled],
}

const stateManagement = {
    getShareableState: getShareableState,
    endPoint: SUPPORT_METRICS_END_POINT,
    navigateTo: SUPPORT_METRICS,
}

const rawData = {
    fetchRawData: fetchTicketsWithIterationsRaw
}

const filterLabel = {
    fetchDisplayFilter: fetchDisplayFilter,
    getFilterFields: getSetDataFields,
}

const metricDescription = {
    fetchMetricDescription: fetchMetricDesc,
}

export const supportMetricsContext = {
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


export function SupportMetricsApplySharedState() {
    return <ApplySharedState />
}

export default function SupportMetrics() {
    return <MultisetContainerContext.Provider value={supportMetricsContext}>
        <MultisetContainer
            sets={Sets}
            toolbar={SupportMetricsToolbar}
        />
    </MultisetContainerContext.Provider>
}
