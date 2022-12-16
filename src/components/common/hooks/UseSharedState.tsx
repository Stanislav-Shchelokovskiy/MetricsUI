import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { applyState, changeState } from '../store/state/Actions'
import { PullState } from '../network_resource_fetcher/FetchState'


export default function useSharedStateDispatch() {
    const { stateId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            console.log(stateId)
            if (stateId === undefined)
                return
            const fetchedState = await PullState(stateId)
            if (fetchedState.success) {
                dispatch(applyState(fetchedState.data))
                dispatch(changeState(stateId))
            }
        })()
    }, [stateId, dispatch])
}
