import FORECASTER_END_POINT, { FLOWER_END_POINT } from './EndPoint'
import FetchResult from './FetchResult'


export interface SyncTribeRepliesWithWfTasksNames {
    names: Array<string>
}

export interface SyncTribeRepliesWithWfTasks {
    started: boolean
}

export interface SyncTribeRepliesWithWfTask {
    task_id: string
}


export const FetchSyncTribeRepliesWithWfTasksNames: () => Promise<FetchResult<SyncTribeRepliesWithWfTasksNames>> = async function () {
    try {
        // const end_point = 'http://localhost:11002'
        // const taskNames: Array<string> = await fetch(`${end_point}/get_sync_tribe_replies_with_wf_tasks_names`).then(response => response.json())
        const taskNames: Array<string> = await fetch(`${FORECASTER_END_POINT}/get_sync_tribe_replies_with_wf_tasks_names`).then(response => response.json())
        return {
            success: true,
            data: { names: taskNames }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: { names: Array<string>() }
        }
    }
}


export const FetchApplySyncTribeRepliesWithWfTask: () => Promise<FetchResult<SyncTribeRepliesWithWfTask>> = async function () {
    try {
        const { 'task-id': task_id }: { 'task-id': string } = await fetch(`${FLOWER_END_POINT}/api/task/apply/sync_tribe_replies_with_wf`, { method: 'POST' }).then(response => response.json())
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


export const FetchSyncTribeRepliesWithWfTasksStarted: (names: Array<string>) => Promise<FetchResult<SyncTribeRepliesWithWfTasks>> = async function (names: Array<string>) {
    try {
        for (const taskName of names) {
            const taskStarted = await fetch(`${FLOWER_END_POINT}/api/tasks?` +
                new URLSearchParams({
                    taskname: taskName,
                    state: 'STARTED'
                })
            ).then(response => response.json())
            if (Object.keys(taskStarted).length !== 0) {
                return {
                    success: true,
                    data: { started: true }
                }
            }
        }
        return {
            success: true,
            data: { started: false }
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            data: { started: false }
        }
    }
}
