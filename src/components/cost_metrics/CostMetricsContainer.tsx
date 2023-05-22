// import './styles/CustomersActivityContainer.css'
// import './styles/CommonSettingsPanel.css'
// import './styles/Set.css'

import React from 'react'
import Sets from './content/Sets'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import Toolbar from './toolbar/Toolbar'


export default function CostMetrics() {
    return <MultisetContainer
        className='CostMetricsContainer'
        plotlyDivId='CostMetrics_ComparisonGraph'
        sets={Sets}
        toolbar={Toolbar}
        children={
            <div className='CostMetricsContent'>
                <div>Content</div>
                {/* <CommonSettingsPanel />
                <ComparisonGraph /> */}
            </div>
        }
    />
}
