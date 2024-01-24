import React from 'react'
import TaskProgressNotifier, { TaskProgressNotifierProps, TaskStarter } from './TaskProgressNotifier'
import LoadIndicator from '../../common/components/LoadIndicator'
import Button from '../../common/components/Button'

interface ButtonProps {
    icon: string
    hint: string
}

export default function TaskButton(props: ButtonProps & TaskProgressNotifierProps) {
    return <TaskProgressNotifier
        {...props}
        child={SpinnerButton}
    />
}

function SpinnerButton(props: ButtonProps & TaskStarter) {
    return props.taskStarted === true ?
        <LoadIndicator width={24} height={24} /> :
        <Button
            icon={props.icon}
            hint={props.hint}
            onClick={props.startTask} />
}

