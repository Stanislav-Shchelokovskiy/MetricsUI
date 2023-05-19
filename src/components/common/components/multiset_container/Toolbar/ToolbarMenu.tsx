import React, { useState, PropsWithChildren, FC, useRef } from 'react'
import Button from '../../Button'
import { ToolbarProps } from './Toolbar'

export interface ToolbarMenuProps extends ToolbarProps {
    menuButtonTooltip: FC<TooltipProps>
}

export interface TooltipProps {
    visible: boolean
    target: string
}


export function ToolbarMenu(props: PropsWithChildren<ToolbarMenuProps>) {
    return <div className='ToolbarMenu'>
        <MenuButton {...props} />
        {props.children}
    </div>
}

function MenuButton(props: ToolbarMenuProps) {
    const [filterTooltipVisible, setFilterTooltipVisible] = useState(false)
    const timerId = useRef<NodeJS.Timeout | undefined>(undefined)
    const onEnter = () => {
        timerId.current = setTimeout(() => {
            setFilterTooltipVisible(true)
            clearTimeout(timerId.current)
        }, 600)
    }
    const onLeave = () => {
        clearTimeout(timerId.current)
        timerId.current = undefined
        setFilterTooltipVisible(false)
    }

    return <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
    >
        <Button
            className='ToolbarMenuButton'
            id='ToolbarMenuButton'
            icon='menu'
            onClick={props.showHideMenu}
        />
        <props.menuButtonTooltip
            visible={filterTooltipVisible && !props.menuOpened}
            target='#ToolbarMenuButton'
        />
    </div >
}
