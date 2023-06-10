import './styles/Set.css'
import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import { SUPPORT_ANALYTICS_END_POINT } from '../common/EndPoint'
import Sets from './content/Sets'
import { ContainerState } from './store/ContainerReducer'
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import CustomersActivityToolbar from './toolbar/Toolbar'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import { fetchGroupByPeriods } from './network_resource_fetcher/FetchGroupByPeriods'
import { fetchPeriod } from './network_resource_fetcher/FetchPeriod'
import { fetchMetrics } from './network_resource_fetcher/FetchMetrics'
import { fetchPeriodsArray } from './network_resource_fetcher/FetchPeriodsArray'
import { fetchTicketsWithIterationsAggregates } from './network_resource_fetcher/FetchTicketsWithIterationsAggregates'

const graphSettingsContext = {
    fetchPeriod: fetchPeriod,
    fetchGroupByPeriods: fetchGroupByPeriods,
    fetchMetrics: fetchMetrics,
}

const graphContext = {
    fetchPeriods: fetchPeriodsArray,
    fetchAggs: fetchTicketsWithIterationsAggregates,
    containerDepsSelector: (containerState: BaseContainerState) => [(containerState as ContainerState).baselineAlignedModeEnabled],
}

const multisetContainerContext = {
    graphSettingsPanel: graphSettingsContext,
    graph: graphContext,
}


export function CustomersActivityApplySharedState() {
    return <ApplySharedState
        endPoint={SUPPORT_ANALYTICS_END_POINT}
        navigateTo='/CustomersActivity'
    />
}

export default function CustomersActivity() {
    return <MultisetContainerContext.Provider value={multisetContainerContext}>
        <MultisetContainer
            sets={Sets}
            toolbar={CustomersActivityToolbar}
        />
    </MultisetContainerContext.Provider>
}
