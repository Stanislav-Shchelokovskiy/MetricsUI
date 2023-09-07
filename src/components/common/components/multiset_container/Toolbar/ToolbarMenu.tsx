import React, { useState, PropsWithChildren, FC, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { removeAllSets } from '../../../store/multiset_container/Actions'
import Button from '../../Button'
import { ToolbarProps } from './Toolbar'
import FilterTooltip from './FilterTooltip'

export function ToolbarMenu(props: PropsWithChildren<ToolbarProps>) {
    return <div className='ToolbarMenu'>
        <MenuButton {...props} />
        {props.children}
        <RemoveAllSetsButton visible={props.menuOpened} />
    </div>
}

function RemoveAllSetsButton({ visible }: { visible: boolean }) {
    const dispatch = useDispatch()
    const onClick = () => dispatch(removeAllSets(undefined))

    if (visible)
        return <Button
            className='CommandButton'
            hint='Remove all sets'
            icon='close'
            stylingMode='text'
            onClick={onClick}
        />
    return null
}

function MenuButton(props: ToolbarProps) {
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
        <FilterTooltip
            visible={filterTooltipVisible && !props.menuOpened}
            target='#ToolbarMenuButton'
        />
    </div >
}
