import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { PullState } from '../../network_resource_fetcher/FetchState'
import { useMultisetContainerContext } from '../../components/multiset_container/MultisetContainerContext'
import { useNotificationContext } from '../../../app_components/ErrorNotifier'
import { convertState } from '../../../engineering_metrics/StatesConverter'

const FORBIDDEN = 403
const NOT_FOUND = 404

export default function ApplySharedState() {
    const context = useMultisetContainerContext()
    const { stateId } = useParams()
    const [loadState, setLoadState] = useState(getState())

    useEffect(() => {
        (async () => {
            if (stateId === undefined)
                return
            const fetchedState = await PullState(context.stateManagement.endPoint, stateId)
            let [status, state] = fetchedState.data
            if (state !== undefined)
                state = await convertState(state, context.context)
            context.changeState(state)
            setLoadState(getState(true, status))
        })()
    }, [])

    const notificationContext = useNotificationContext()
    notificationContext.push(loadState.error)

    if (loadState.loaded)
        return <Navigate to={context.stateManagement.navigateTo} replace={true} />
    return null
}

export function getState(loaded: boolean = false, status: number = 200) {
    let error = ''
    switch (status) {
        case FORBIDDEN:
            error = 'You are not authorized to apply this state.'
            break

        case NOT_FOUND:
            error = 'State is not available.'
            break
    }
    return {
        loaded: loaded,
        error: error
    }
}
