import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import FilterBuilder, { CustomOperation } from 'devextreme-react/filter-builder'
import { CustomersActivityStore } from '../store/Store'
import Button from '../../common/components/Button'
import { Tooltip } from 'devextreme-react/tooltip'
import { fetchDisplayFilter } from '../network_resource_fetcher/FetchDisplayFilter'
import { isTicketsMetricSelected } from '../common_settings_panel/MetricSelector'
import { getSetDataFields } from '../store/SetsReducer'


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
            onClick={props.showHideMenu}
        />
        <FilterTooltip visible={filterTooltipVisible && !props.menuOpened} />
    </div >
}

const FilterTooltip = React.memo(({ visible }: { visible: boolean }) => {
    return <Tooltip
        className='CustomersActivityFilterTooltip'
        target="#CustomersActivityMenuButton"
        visible={visible}
    >
        <FilterLabel />
    </Tooltip>
})

const FilterLabel = React.memo(() => {
    const metric = useSelector((store: CustomersActivityStore) => store.customersActivity.metric)
    const customersActivitySets = useSelector((store: CustomersActivityStore) => store.customersActivitySets)

    const fields = useMemo(() => getSetDataFields(), [])

    const [displayFilter, setDisplayFilter] = useState<Array<any>>([])

    useEffect(() => {
        (async () => {
            Promise.all(customersActivitySets.map(set => fetchDisplayFilter(isTicketsMetricSelected(metric), set)))
                .then(fetchResults => {
                    const ds: Array<any> = []
                    let fetchResult: any
                    for (fetchResult of fetchResults) {
                        if (fetchResult.success && fetchResult.data.length > 0)
                            ds.push(fetchResult.data)
                    }
                    if (ds.length === 1)
                        setDisplayFilter(ds[0])
                    else if (ds.length > 1)
                        setDisplayFilter(ds)
                })
        }
        )()
    }, [metric, customersActivitySets])

    if (displayFilter.length < 1)
        return <div>No filters</div>
    return <FilterBuilder
        className='CustomersActivityFilterBuilder'
        fields={fields}
        value={displayFilter}
    >
        <CustomOperation
            name='in'
            caption='IN' />
        <CustomOperation
            name='notin'
            caption='NOT IN' />
        <CustomOperation
            name='between'
            caption='BETWEEN' />
        <CustomOperation
            name='notbetween'
            caption='NOT BETWEEN' />
        <CustomOperation
            name='<=' />
        <CustomOperation
            name='>' />
        <CustomOperation
            name='='
            caption='IS' />
    </FilterBuilder>
})

