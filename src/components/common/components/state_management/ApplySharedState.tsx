import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { applyState } from '../../store/state/Actions'
import { PullState } from '../../network_resource_fetcher/FetchState'

interface Props {
    endPoint: string
    navigateTo: string
}

export default function ApplySharedState(props: Props) {
    const { stateId } = useParams()
    const dispatch = useDispatch();
    (async () => {
        if (stateId === undefined)
            return
        const fetchedState = await PullState(props.endPoint, stateId)
        if (fetchedState.success)
            dispatch(applyState(fetchedState.data))
    })()
    return <Navigate to={props.navigateTo} replace={true} />
}
