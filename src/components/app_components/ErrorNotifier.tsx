import React, { useState, PropsWithChildren, createContext, useContext } from 'react'
import { Toast } from 'devextreme-react/toast'

function ErrorToast() {
    const context = useNotificationContext()
    const hidden = {
        visible: false,
        message: '',
    }

    const visible = {
        visible: true,
        message: context.error,
    }

    const [config, setConfig] = useState(context.error && context.error.length !== 0 ? visible : hidden)

    const onHiding = () => {
        context.error = ''
        setConfig(hidden)
    }

    return (
        context.error ? < Toast
            {...config}
            displayTime={4000}
            type='error'
            onHiding={onHiding}
        /> : null
    )
}

export default function ErrorNotifier(props: PropsWithChildren) {
    return <NotificationContext.Provider value={defaultContext}>
        {props.children}
        <ErrorToast />
    </NotificationContext.Provider>
}

interface Context {
    error: string
}

const defaultContext = { error: '' }
const NotificationContext = createContext<Context>(defaultContext)

export function useNotificationContext() {
    return useContext(NotificationContext)
}
