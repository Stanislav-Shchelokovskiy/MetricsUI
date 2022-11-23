import React, { useState } from 'react'
import { Button } from 'devextreme-react/button'
import LoadIndicator from '../../../common/LoadIndicator'
import FetchResult from '../../network_resource_fetcher/FetchResult'
import {
    FetchSyncTribeRepliesWithWfTasksStarted,
    SyncTribeRepliesWithWfTasks,
    FetchApplySyncTribeRepliesWithWfTask,
} from '../../network_resource_fetcher/FetchSyncTribeRepliesWithWfTask'
import { changeLastUpdated } from '../../store/Actions'
import { useAppDispatch } from '../../../common/AppStore'

export default function UpdateTribeRepliesButton() {
    const [taskStarted, setTaskStarted] = useState<boolean>(false);
    const dispatch = useAppDispatch()

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
            className='ForecasterUpdateTribeRepliesButton'
            render={renderButton}
            disabled={taskStarted}
            type='normal'
            stylingMode='outlined'
            focusStateEnabled={false}
            onClick={onClick} />
    )
}
