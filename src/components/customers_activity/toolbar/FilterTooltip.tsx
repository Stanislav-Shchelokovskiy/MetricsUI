import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import FilterBuilder, { CustomOperation } from 'devextreme-react/filter-builder'
import { CustomersActivityStore } from '../store/Store'
import { Tooltip } from 'devextreme-react/tooltip'
import { fetchDisplayFilter } from '../network_resource_fetcher/FetchDisplayFilter'
import { getSetDataFields } from '../store/sets_reducer/SetDescriptor'
import { TooltipProps } from '../../common/components/multiset_container/Toolbar/ToolbarMenu'


export const FilterTooltip = React.memo(({ visible, target }: TooltipProps) => {
    return (
        <Tooltip
            className='CustomersActivityFilterTooltip'
            target={target}
            visible={visible}
        >
            <FilterLabel />
        </Tooltip>
    )
})

const FilterLabel = React.memo(() => {
    const metric = useSelector((store: CustomersActivityStore) => store.container.metric)
    const customersActivitySets = useSelector((store: CustomersActivityStore) => store.sets)

    const fields = useMemo(() => getSetDataFields(), [])

    const [displayFilter, setDisplayFilter] = useState<Array<any>>([])

    useEffect(() => {
        (async () => {
            Promise.all(customersActivitySets.map(set => fetchDisplayFilter(metric, set)))
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
        <CustomOperation
            name='!='
            caption='IS NOT' />
    </FilterBuilder>
})
