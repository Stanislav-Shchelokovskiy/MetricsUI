import React, { useEffect, useCallback, useReducer, FC } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { Toast } from 'devextreme-react/toast'

export interface TaskProgressNotifierProps {
    className: string
    task: (
        dispatchTaskState: (started: boolean) => void,
        onSuccess: (message: string) => void,
        onError: (message: string) => void,
    ) => Promise<void>
}

export interface TaskStarter {
    taskStarted: boolean
    startTask: () => void
}

interface TaskProgressNotifierContainer extends TaskProgressNotifierProps {
    child: FC<any> | null
    autoStartTask: boolean
}

interface ToastConfig {
    message: string
    visible: boolean
    displayTime: number
    type: any
}

const defaultToastConfig = {
    visible: false,
    message: '',
    displayTime: 3000,
    type: 'error',
}

interface ToastState {
    taskStarted: boolean
    toastConfig: ToastConfig
}

const INITIAL_STATE: ToastState = {
    taskStarted: false,
    toastConfig: defaultToastConfig
}

const CHANGE_TASK_STATUS = 'task_started'
const CHANGE_TOAST_CONFIG = 'toast_config'


function stateReducer(state: ToastState, action: AnyAction): ToastState {
    switch (action.type) {
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                taskStarted: action.payload,
            }
        case CHANGE_TOAST_CONFIG:
            return {
                ...state,
                toastConfig: action.payload
            }
        default:
            return state
    }
}

const changeTaskStatus = (started: boolean): AnyAction => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: started
    }
}

const changeToastConfig = (next: ToastConfig): AnyAction => {
    return {
        type: CHANGE_TOAST_CONFIG,
        payload: next
    }
}

export default function TaskProgressNotifier(props: TaskProgressNotifierContainer) {
    const [state, stateDispatch] = useReducer(stateReducer, INITIAL_STATE)

    const onError = useCallback(
        (message: string) => {
            stateDispatch(changeToastConfig({
                displayTime: 4000,
                type: 'error',
                message: message,
                visible: true,
            }));
        }, [])

    const onSuccess = useCallback(
        (message: string) => {
            stateDispatch(changeToastConfig({
                displayTime: 2000,
                type: 'success',
                message: message,
                visible: true,
            }));
        }, [])


    const onHiding = useCallback(() => stateDispatch(changeToastConfig(defaultToastConfig)), [])
    const dispatchTaskState = useCallback((started: boolean) => stateDispatch(changeTaskStatus(started)), [])

    const task = props.task

    const startTask = useCallback(() => {
        (async () => {
            await task(dispatchTaskState, onSuccess, onError)
        })();
    }, [dispatchTaskState, onError, onSuccess, task])

    useEffect(() => {
        if (props.autoStartTask)
            startTask()
    }, [props.autoStartTask])

    return (
        <div className={props.className}>
            {props.child ? <props.child
                {...props}
                startTask={startTask}
                taskStarted={state.taskStarted} /> : null}
            <Toast
                {...state.toastConfig}
                onHiding={onHiding}
            />
        </div>
    )
}

const defaultProps = {
    className: '',
    child: null,
    autoStartTask: false,
}

TaskProgressNotifier.defaultProps = defaultProps
