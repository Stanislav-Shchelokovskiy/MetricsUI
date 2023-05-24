import React, { useCallback, useReducer } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { Toast } from 'devextreme-react/toast'
import LoadIndicator from '../../common/components/LoadIndicator'
import Button from '../../common/components/Button'

interface Props {
    className: string
    icon: string
    hint: string
    task: (
        dispatchTaskState: (started: boolean) => void,
        onSuccess: (message: string) => void,
        onError: (message: string) => void,
    ) => Promise<void>
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

interface TaskButtonState {
    taskStarted: boolean
    toastConfig: ToastConfig
}

const INITIAL_STATE: TaskButtonState = {
    taskStarted: false,
    toastConfig: defaultToastConfig
}

const CHANGE_TASK_STATUS = 'task_started'
const CHANGE_TOAST_CONFIG = 'toast_config'


function stateReducer(state: TaskButtonState, action: AnyAction): TaskButtonState {
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


export default function TaskButton(props: Props) {
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

    return (
        <div className={props.className}>
            {state.taskStarted === true ?
                <LoadIndicator width={36} height={32} /> :
                <Button
                    
                    icon={props.icon}
                    hint={props.hint}
                    onClick={startTask} />}
            <Toast
                {...state.toastConfig}
                onHiding={onHiding}
            />
        </div>
    )
}
