import './styles/CustomersActivityContainer.css'
import './styles/Set.css'
import '../common/styles/multiset_container/ComparisonGraph.css'
import '../common/styles/multiset_container/MultisetContainer.css'
import '../common/styles/multiset_container/Toolbar.css'
import '../common/styles/multiset_container/FilterTooltip.css'

import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { applyState } from '../common/store/state/Actions'
import { PullState } from '../common/network_resource_fetcher/FetchState'
import GraphSettingsPanel from '../common/components/multiset_container/graph/GraphSettingsPanel'
import Sets from './content/Sets'
import CustomersActivityComparisonGraph from './ComparisonGraph'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import CustomersActivityToolbar from './toolbar/Toolbar'

export function CustomersActivityApplySharedState() {
    const { stateId } = useParams()
    const dispatch = useDispatch();
    (async () => {
        if (stateId === undefined)
            return
        const fetchedState = await PullState(stateId)
        if (fetchedState.success)
            dispatch(applyState(fetchedState.data))
    })()
    return <Navigate to='/CustomersActivity' replace={true} />
}

export default function CustomersActivity() {
    return (
        <MultisetContainer
            className='CustomersActivityContainer'
            plotlyDivId='CustomersActivity_ComparisonGraph'
            sets={Sets}
            toolbar={CustomersActivityToolbar}
        >
            <div className='CustomersActivityContent'>
                <GraphSettingsPanel />
                <CustomersActivityComparisonGraph />
            </div>
        </MultisetContainer>
    )
}
