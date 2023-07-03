import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { PullState } from '../../network_resource_fetcher/FetchState'
import { useMultisetContainerContext } from '../../components/multiset_container/MultisetContainerContext'

export default function ApplySharedState() {
    const context = useMultisetContainerContext()
    const { stateId } = useParams();

    (async () => {
        if (stateId === undefined)
            return
        const fetchedState = await PullState(context.stateManagement.endPoint, stateId)
        if (fetchedState.success)
            context.changeState(fetchedState.data)
    })()

    return <Navigate to={context.stateManagement.navigateTo} replace={true} />
}
