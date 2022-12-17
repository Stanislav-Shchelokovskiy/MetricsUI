import React from 'react'
import copy from 'copy-to-clipboard'
import { useStore } from 'react-redux'
import TaskButton from '../../../common/components/TaskButton'
import { PushState } from '../../network_resource_fetcher/FetchState'
import FetchResult from '../../Interfaces'
import { KeyProps } from './Interfaces'


function ShareStateButton(props: KeyProps) {

    const store = useStore()

    const shareState = async (
        dispatchTaskState: (started: boolean) => void,
        onSuccess: (message: string) => void,
        onError: (message: string) => void,
    ) => {
        const fetchedStateId: FetchResult<string> = await PushState(store.getState())
        if (fetchedStateId.success) {
            const successfullyCopied = copy(`${window.location.href}/${fetchedStateId.data}`)
            if (successfullyCopied) {
                onSuccess('Link to state copied to clipboard.')
                return
            }
            onError("Couldn't copy link to clipboard. Clipboard API didn't work in this browser.")
            return
        }
        onError("Couldn't copy link to clipboard. State is not available.")
    }

    return <TaskButton
        className='CustomersActivityShareStateButton'
        icon='export'
        hint='Share state'
        task={shareState} />
}

export default React.memo(ShareStateButton)
