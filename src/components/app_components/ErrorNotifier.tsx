import React, { useState, PropsWithChildren, createContext, useContext } from 'react'
import { Toast } from 'devextreme-react/toast'

function ErrorToast() {
    const context = useNotificationContext()
    const [config, setConfig] = useState(createConfig(context.pop()))

    const onHiding = () => {
        setConfig(createConfig(context.popNoTake()))
    }

    return (
        config.visible ? < Toast
            {...config}
            displayTime={4000}
            type='error'
            onHiding={onHiding}
        /> : null
    )
}

function createConfig(message: string | undefined) {
    return {
        visible: message != undefined && message.length > 0,
        message: message,
    }
}

export default function ErrorNotifier(props: PropsWithChildren) {
    return <NotificationContext.Provider value={defaultContext}>
        {props.children}
        <ErrorToast />
    </NotificationContext.Provider>
}

interface Context {
    push: (error: string) => void
    pop: () => string | undefined
    popNoTake: () => string | undefined
}

const errorQueue = Array<string>()

function push(error: string) {
    if (error)
        errorQueue.push(error)
}

function pop() {
    return errorQueue.shift()
}

function popNoTake() {
    if (errorQueue.length)
        return errorQueue[0]
}

const defaultContext = {
    push: push,
    pop: pop,
    popNoTake: popNoTake,
}

const NotificationContext = createContext<Context>(defaultContext)

export function useNotificationContext() {
    return useContext(NotificationContext)
}
