import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import Sets from './content/Sets'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import MultisetContainerContent from '../common/components/multiset_container/MultisetContainerContent'
import CostMetricsToolbar from './toolbar/Toolbar'
import GraphSettingsPanel from '../common/components/multiset_container/graph/GraphSettingsPanel'
import CostMetricsComparisonGraph from './ComparisonGraph'
import { fetchPeriod } from './network_resource_fetcher/FetchPeriod'
import { fetchGroupByPeriods } from './network_resource_fetcher/FetchGroupByPeriods'


export default function CostMetrics() {
    return <MultisetContainer
        sets={Sets}
        toolbar={CostMetricsToolbar}
    >
        <MultisetContainerContent>
            <GraphSettingsPanel
                fetchPeriod={fetchPeriod}
                fetchGroupByPeriods={fetchGroupByPeriods} />
            <CostMetricsComparisonGraph />
        </MultisetContainerContent>
    </MultisetContainer>
}
