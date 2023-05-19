import React, { PropsWithChildren, } from 'react'

export interface ToolbarProps {
    showHideMenu: () => void
    menuOpened: boolean
}

export function Toolbar(props: PropsWithChildren<ToolbarProps>) {
    return (
        < div className='Toolbar'>
            {props.children}
        </div>
    )
}
