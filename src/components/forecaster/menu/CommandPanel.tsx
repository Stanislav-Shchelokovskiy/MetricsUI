import React, { useState } from 'react';
import { Button } from 'devextreme-react/button';
import LoadIndicator from '../utils/LoadIndicator'
import FetchResult from '../network_resource_fetcher/FetchResult'
import {
    FetchSyncTribeRepliesWithWfTasksNames,
    SyncTribeRepliesWithWfTasksNames,
    FetchSyncTribeRepliesWithWfTasksStarted,
    SyncTribeRepliesWithWfTasks,
    FetchApplySyncTribeRepliesWithWfTask,
} from '../network_resource_fetcher/FetchSyncTribeRepliesWithWfTask'

export default function CommandPanel() {
    const [taskStarted, setTaskStarted] = useState<boolean>(false)

    const onClick = () => {
        setTaskStarted(true);

        let tasksNames = Array<string>();
        (async () => {
            const fetchTasksNames: FetchResult<SyncTribeRepliesWithWfTasksNames> = await FetchSyncTribeRepliesWithWfTasksNames()
            if (fetchTasksNames.success) {
                tasksNames = fetchTasksNames.data.names
            }
            const fetchTaskStarted: FetchResult<SyncTribeRepliesWithWfTasks> = await FetchSyncTribeRepliesWithWfTasksStarted(tasksNames)
            if (fetchTaskStarted.success && !fetchTaskStarted.data.started) {
                await FetchApplySyncTribeRepliesWithWfTask()
            }
        })();

        const intervalId = setInterval(() => {
            (async () => {
                const fetchResult: FetchResult<SyncTribeRepliesWithWfTasks> = await FetchSyncTribeRepliesWithWfTasksStarted(tasksNames)
                console.log(fetchResult)
                if (!fetchResult.success || !fetchResult.data.started) {
                    setTaskStarted(false);
                    clearInterval(intervalId)
                }
            })()
        }, 3000)
    }
    const renderButton = () => {
        if (!taskStarted)
            return 'Update Tribe Replies'
        return <LoadIndicator width={undefined} height={25} />
    }
    return (
        <div className='CommandPanel'>
            <Button
                width={150}
                height={40}
                render={renderButton}
                disabled={taskStarted}
                type='normal'
                stylingMode='outlined'
                focusStateEnabled={false}
                onClick={onClick}
            />
        </div>
    )

}