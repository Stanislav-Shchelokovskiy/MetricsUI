import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { applyState } from '../../store/view_state/Actions'
import { PullState } from '../../network_resource_fetcher/FetchState'
import { useMultisetContainerContext } from '../../components/multiset_container/MultisetContainerContext'

export default function ApplySharedState() {
    const context = useMultisetContainerContext()
    const { stateId } = useParams()
    const dispatch = useDispatch();

    (async () => {
        if (stateId === undefined)
            return
        const fetchedState = await PullState(context.stateManagement.endPoint, stateId)
        if (fetchedState.success)
            dispatch(applyState(fetchedState.data))
    })()
    
    return <Navigate to={context.stateManagement.navigateTo} replace={true} />
}
