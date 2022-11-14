import React, { useState } from 'react';
import { Button } from 'devextreme-react/button';
import LoadIndicator from '../utils/LoadIndicator'

import FetchResult from '../network_resource_fetcher/FetchResult'
import {
    FetchSyncTribeRepliesWithWfTasksStarted,
    SyncTribeRepliesWithWfTasks,
    FetchApplySyncTribeRepliesWithWfTask,
} from '../network_resource_fetcher/FetchSyncTribeRepliesWithWfTask'
import { changeLastUpdated } from '../store/ForecasterReducer'
import {useForecasterDispatch} from '../store/Hooks'


function CommandPanel() {
    return (
        <div className='CommandPanel'>
            <ButtonUpdateTribeReplies />
        </div>
    )
}


function ButtonUpdateTribeReplies() {
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
    return (
        <Button
            width={150}
            height={40}
            render={renderButton}
            disabled={taskStarted}
            type='normal'
            stylingMode='outlined'
            focusStateEnabled={false}
            onClick={onClick} />
    )
}

export default CommandPanel
