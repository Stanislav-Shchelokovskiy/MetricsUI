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
import { ContainerState } from './store/ContainerReducer'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import { fetchGroupByPeriods } from './network_resource_fetcher/FetchGroupByPeriods'
import { fetchPeriod } from './network_resource_fetcher/FetchPeriod'
import { fetchMetrics } from './network_resource_fetcher/FetchMetrics'
import { fetchPeriodsArray } from './network_resource_fetcher/FetchPeriodsArray'
import { fetchTicketsWithIterationsAggregates } from './network_resource_fetcher/FetchTicketsWithIterationsAggregates'
import { SUPPORT_ANALYTICS_END_POINT } from '../common/EndPoint'
import { getShareableState } from '../common/store/multiset_container/Store'
import { fetchTicketsWithIterationsRaw } from './network_resource_fetcher/FetchTicketsWithIterationsRaw'
import { fetchDisplayFilter } from './network_resource_fetcher/FetchDisplayFilter'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'

const graphSettings = {
    fetchPeriod: fetchPeriod,
    fetchGroupByPeriods: fetchGroupByPeriods,
}

const graph = {
    fetchPeriods: fetchPeriodsArray,
    fetchAggs: fetchTicketsWithIterationsAggregates,
    containerDepsSelector: (containerState: BaseContainerState) => [(containerState as ContainerState).baselineAlignedModeEnabled],
}

const stateManagement = {
    shareableStateSelector: getShareableState,
    stateSalt: 'CustomersActivity_',
    endPoint: SUPPORT_ANALYTICS_END_POINT,
    navigateTo: '/CustomersActivity',
}

const rawData = {
    fetchRawData: fetchTicketsWithIterationsRaw
}

const filterLabel = {
    fetchDisplayFilter: fetchDisplayFilter
}

export const supportMetricsContext = {
    graphSettingsPanel: graphSettings,
    graph: graph,
    stateManagement: stateManagement,
    rawData: rawData,
    filterLabel: filterLabel,
    fetchMetrics: fetchMetrics,
    changeContext: (ctx: any) => { },
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
