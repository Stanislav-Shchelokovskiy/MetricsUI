import './styles/Set.css'
import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import { SUPPORT_ANALYTICS_END_POINT } from '../common/EndPoint'
import GraphSettingsPanel from '../common/components/multiset_container/graph/GraphSettingsPanel'
import Sets from './content/Sets'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import MultisetContainerContent from '../common/components/multiset_container/MultisetContainerContent'
import CustomersActivityToolbar from './toolbar/Toolbar'
import CustomersActivityComparisonGraph from './ComparisonGraph'
import { fetchGroupByPeriods } from './network_resource_fetcher/FetchGroupByPeriods'
import { fetchPeriod } from './network_resource_fetcher/FetchPeriod'
import { fetchMetrics } from './network_resource_fetcher/FetchMetrics'

export function CustomersActivityApplySharedState() {
    return <ApplySharedState
        endPoint={SUPPORT_ANALYTICS_END_POINT}
        navigateTo='/CustomersActivity'
    />
}

export default function CustomersActivity() {
    return (
        <MultisetContainer
            sets={Sets}
            toolbar={CustomersActivityToolbar}
        >
            <MultisetContainerContent>
                <GraphSettingsPanel
                    fetchPeriod={fetchPeriod}
                    fetchGroupByPeriods={fetchGroupByPeriods}
                    fetchMetrics={fetchMetrics} />
                <CustomersActivityComparisonGraph />
            </MultisetContainerContent>
        </MultisetContainer>
    )
}
