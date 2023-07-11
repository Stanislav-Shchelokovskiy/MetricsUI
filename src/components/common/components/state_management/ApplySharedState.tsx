import React, { useState, useCallback, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Toast } from 'devextreme-react/toast'
import { PullState } from '../../network_resource_fetcher/FetchState'
import { useMultisetContainerContext } from '../../components/multiset_container/MultisetContainerContext'


export default function ApplySharedState() {
    const context = useMultisetContainerContext()
    const { stateId } = useParams()

    useEffect(() => {
        (async () => {
            if (stateId === undefined)
                return
            const fetchedState = await PullState(context.stateManagement.endPoint, stateId)
            if (fetchedState.success) {
                if (fetchedState.data) {
                    context.changeState(fetchedState.data)
                    return
                }
            }
        })()
    }, [])


    return <Navigate to={context.stateManagement.navigateTo} replace={true} />
}


export function ApplyStateErrorToast({ state }: { state: any }) {

    const hidden = {
        visible: false,
        message: '',
    }

    const visible = {
        visible: true,
        message: state.error,
    }

    const [config, setConfig] = useState(state.error ? visible : hidden)


    const onHiding = useCallback(() => setConfig(hidden), [])

    return (
        state.error ? < Toast
            {...config}
            displayTime={3000}
            type='error'
            onHiding={onHiding}
        /> : null
    )
}
