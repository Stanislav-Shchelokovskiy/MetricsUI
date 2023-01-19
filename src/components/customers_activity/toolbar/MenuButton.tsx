import React, { useRef, useState } from 'react'
import Button from '../../common/components/Button'
import { Tooltip } from 'devextreme-react/tooltip'

interface Props {
    showHideMenu: () => void
    menuOpened: boolean
}

export default function MenuButton(props: Props) {
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
            className='CustomersActivityMenuButton'
            id='CustomersActivityMenuButton'
            icon='menu'
            // hint={props.menuOpened ? 'Hide Sets' : 'Show sets'}
            onClick={props.showHideMenu}
        />
        <Tooltip
            target="#CustomersActivityMenuButton"
            visible={filterTooltipVisible}
        >
        </Tooltip>
    </div>
}
