import { FORECASTER_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'

export interface SyncTribeRepliesWithWfTask {
    task_id: string
}

interface TaskId {
    'task-id': string
}

function convertApply(taskId: TaskId | undefined): SyncTribeRepliesWithWfTask {
    if (taskId)
        return { task_id: taskId['task-id'] }
    return { task_id: '' }
}

export async function FetchApplySyncTribeRepliesWithWfTask(): Promise<FetchResult<SyncTribeRepliesWithWfTask>> {
    return fetchConvert(convertApply,
        `${FORECASTER_END_POINT}/apply_sync_tribe_replies_with_wf_task`,
        { method: 'POST' }
    )
}


export interface SyncTribeRepliesWithWfTasks {
    started: boolean
}

function convertStarted(taskStatus: SyncTribeRepliesWithWfTasks | undefined): SyncTribeRepliesWithWfTasks {
    if (taskStatus)
        return taskStatus
    return { started: false }
}

export async function FetchSyncTribeRepliesWithWfTasksStarted(): Promise<FetchResult<SyncTribeRepliesWithWfTasks>> {
    return fetchConvert(convertStarted, `${FORECASTER_END_POINT}/get_sync_tribe_replies_with_wf_tasks_started`)
}
