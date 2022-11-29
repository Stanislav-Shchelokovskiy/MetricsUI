import FORECASTER_END_POINT from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'


export interface SyncTribeRepliesWithWfTasks {
    started: boolean
}

export interface SyncTribeRepliesWithWfTask {
    task_id: string
}


export const FetchApplySyncTribeRepliesWithWfTask: () => Promise<FetchResult<SyncTribeRepliesWithWfTask>> = async function () {
    try {
        const { 'task-id': task_id }: { 'task-id': string } = await fetch(`${FORECASTER_END_POINT}/apply_sync_tribe_replies_with_wf_task`, { method: 'POST' }).then(response => response.json())

        console.log(task_id)
        return {
            success: true,
            data: { task_id: task_id }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: { task_id: '' }
        }
    }
}


export const FetchSyncTribeRepliesWithWfTasksStarted: () => Promise<FetchResult<SyncTribeRepliesWithWfTasks>> = async function () {
    try {
        const response: { started: boolean } = await fetch(`${FORECASTER_END_POINT}/get_sync_tribe_replies_with_wf_tasks_started`).then(response => response.json())
        return {
            success: true,
            data: response
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: { started: false }
        }
    }
}
