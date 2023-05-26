// import './styles/CustomersActivityContainer.css'
// import './styles/CommonSettingsPanel.css'
// import './styles/Set.css'

import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import Sets from './content/Sets'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import CostMetricsToolbar from './toolbar/Toolbar'
import GraphSettingsPanel from '../common/components/multiset_container/graph/GraphSettingsPanel'
import { fetchPeriod } from './network_resource_fetcher/FetchPeriod'
import { fetchGroupByPeriods } from './network_resource_fetcher/FetchGroupByPeriods'


export default function CostMetrics() {
    return <MultisetContainer
        className='CostMetricsContainer'
        sets={Sets}
        toolbar={CostMetricsToolbar}
    >
        <div className='CostMetricsContent'>
            <GraphSettingsPanel
                fetchPeriod={fetchPeriod}
                fetchGroupByPeriods={fetchGroupByPeriods} />
            {/* <CustomersActivityComparisonGraph /> */}
        </div>
    </MultisetContainer>
}
