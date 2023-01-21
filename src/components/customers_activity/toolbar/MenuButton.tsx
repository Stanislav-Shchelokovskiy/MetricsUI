import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { CustomersActivityStore } from '../store/Store'
import Button from '../../common/components/Button'
import { Tooltip } from 'devextreme-react/tooltip'
import { fetchDisplayFilter } from '../network_resource_fetcher/FetchDisplayFilter'
import FetchResult from '../../common/Interfaces'
import { isTicketsMetricSelected } from '../common_settings_panel/MetricSelector'


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
    const metric = useSelector((store: CustomersActivityStore) => store.customersActivity.metric)
    const customersActivitySets = useSelector((store: CustomersActivityStore) => store.customersActivitySets)


    useEffect(() => {
        for (const set of customersActivitySets) {
            (async () => {
                const fetchResult: FetchResult<Array<any>> = await fetchDisplayFilter(isTicketsMetricSelected(metric), set)
                if (fetchResult.success) {
                    const ds = fetchResult.data
                    console.log(ds)
                }
            })()
        }
    }, [metric, customersActivitySets])

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
