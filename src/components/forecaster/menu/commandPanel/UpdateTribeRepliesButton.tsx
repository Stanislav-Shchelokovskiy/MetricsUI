import React, { useState } from 'react'
import Button from '../../../common/components/Button'
import LoadIndicator from '../../../common/components/LoadIndicator'
import FetchResult from '../../../common/Typing'
import { changeLastUpdated } from '../../store/forecaster/Actions'
import { useDispatch } from 'react-redux'
import {
    fetchSyncTentRepliesWithWfTasksStarted,
    SyncTentRepliesWithWfTasks,
    FetchApplySyncTentRepliesWithWfTask,
} from '../../network_resource_fetcher/SyncTribeRepliesWithWfTask'


export default function UpdateTentRepliesButton() {
    const [taskStarted, setTaskStarted] = useState<boolean>(false);
    const dispatch = useDispatch()

    const onClick = () => {
        setTaskStarted(true);

        (async () => {
            const fetchTaskStarted: FetchResult<SyncTentRepliesWithWfTasks> = await fetchSyncTentRepliesWithWfTasksStarted();
            if (fetchTaskStarted.success && !fetchTaskStarted.data.started) {
                await FetchApplySyncTentRepliesWithWfTask()
            }
        })();

        const intervalId = setInterval(() => {
            (async () => {
                const fetchResult: FetchResult<SyncTentRepliesWithWfTasks> = await fetchSyncTentRepliesWithWfTasksStarted();
                if (!fetchResult.success || !fetchResult.data.started) {
                    setTaskStarted(false);
                    dispatch(changeLastUpdated())
                    clearInterval(intervalId)
                }
            })();
        }, 3000);
    };

    if (!taskStarted)
        return <Button
            className='ForecasterUpdateTribeRepliesButton'
            text='Update Replies'
            disabled={taskStarted}
            icon='refresh'
            onClick={onClick} />
    return <div className='ForecasterUpdateTribeRepliesButton'><LoadIndicator width={undefined} height={35} /></div>
}
