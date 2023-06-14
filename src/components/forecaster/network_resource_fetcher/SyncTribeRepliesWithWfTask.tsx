import { FORECASTER_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'

export interface SyncTentRepliesWithWfTask {
    task_id: string
}

interface TaskId {
    'task-id': string
}

function convertApply(taskId: TaskId | undefined): SyncTentRepliesWithWfTask {
    if (taskId)
        return { task_id: taskId['task-id'] }
    return { task_id: '' }
}

export async function FetchApplySyncTentRepliesWithWfTask(): Promise<FetchResult<SyncTentRepliesWithWfTask>> {
    return fetchConvert(convertApply,
        `${FORECASTER_END_POINT}/apply_sync_tent_replies_with_wf_task`,
        { method: 'POST' }
    )
}


export interface SyncTentRepliesWithWfTasks {
    started: boolean
}

function convertStarted(taskStatus: SyncTentRepliesWithWfTasks | undefined): SyncTentRepliesWithWfTasks {
    if (taskStatus)
        return taskStatus
    return { started: false }
}

export async function fetchSyncTentRepliesWithWfTasksStarted(): Promise<FetchResult<SyncTentRepliesWithWfTasks>> {
    return fetchConvert(convertStarted, `${FORECASTER_END_POINT}/sync_tent_replies_with_wf_tasks_started`)
}
