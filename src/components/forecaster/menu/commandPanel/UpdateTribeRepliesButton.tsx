import React, { useState } from 'react'
import Button from '../../../common/components/Button'
import LoadIndicator from '../../../common/components/LoadIndicator'
import FetchResult from '../../../common/Interfaces'
import { changeLastUpdated } from '../../store/Actions'
import { useForecasterDispatch } from '../../store/Store'
import {
    FetchSyncTribeRepliesWithWfTasksStarted,
    SyncTribeRepliesWithWfTasks,
    FetchApplySyncTribeRepliesWithWfTask,
} from '../../network_resource_fetcher/FetchSyncTribeRepliesWithWfTask'


export default function UpdateTribeRepliesButton() {
    const [taskStarted, setTaskStarted] = useState<boolean>(false);
    const dispatch = useForecasterDispatch()

    const onClick = () => {
        setTaskStarted(true);

        (async () => {
            const fetchTaskStarted: FetchResult<SyncTribeRepliesWithWfTasks> = await FetchSyncTribeRepliesWithWfTasksStarted();
            if (fetchTaskStarted.success && !fetchTaskStarted.data.started) {
                await FetchApplySyncTribeRepliesWithWfTask()
            }
        })();

        const intervalId = setInterval(() => {
            (async () => {
                const fetchResult: FetchResult<SyncTribeRepliesWithWfTasks> = await FetchSyncTribeRepliesWithWfTasksStarted();
                if (!fetchResult.success || !fetchResult.data.started) {
                    setTaskStarted(false);
                    dispatch(changeLastUpdated())
                    clearInterval(intervalId);
                }
            })();
        }, 3000);
    };
    const renderButton = () => {
        if (!taskStarted)
            return 'Update Tribe Replies';
        return <LoadIndicator width={undefined} height={25} />;
    }
    return <Button
        className='ForecasterUpdateTribeRepliesButton'
        render={renderButton}
        disabled={taskStarted}
        onClick={onClick} />
}
