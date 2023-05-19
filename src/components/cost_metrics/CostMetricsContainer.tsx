// import './styles/CustomersActivityContainer.css'
// import './styles/CommonSettingsPanel.css'
// import './styles/Set.css'

import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
//import Sets from './content/Sets'
import { applyState } from '../common/store/state/Actions'
import { PullState } from '../common/network_resource_fetcher/FetchState'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
//import Toolbar from './toolbar/Toolbar'

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
    return <div></div>
    // <MultisetContainer
    //     className='CustomersActivityContainer'
    //     plotlyDivId='CustomersActivity_ComparisonGraph'
    //     sets={Sets}
    //     toolbar={Toolbar}
    //     children={
    //         <div className='CustomersActivityContent'>
    //             {/* <CommonSettingsPanel />
    //             <ComparisonGraph /> */}
    //         </div>
    //     }
    // />
}
