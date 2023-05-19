import React, { PropsWithChildren } from 'react'

export function ToolbarCommands(props: PropsWithChildren) {
    return <div className='ToolbarCommands'>
        {props.children}
    </div>
}

export function ToolbarSeparator() {
    return <div className='ToolbarSeparator'></div>
}
