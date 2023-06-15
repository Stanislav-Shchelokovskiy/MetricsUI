import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import FilterBuilder, { CustomOperation } from 'devextreme-react/filter-builder'
import { Tooltip } from 'devextreme-react/tooltip'
import { getSetDataFields } from '../../../../support_metrics/store/sets/SetDescriptor'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { metricSelector, setsSelector } from '../../../store/multiset_container/Selectors'
import { BaseSetState } from '../../../store/multiset_container/sets/Interfaces'
import { useMultisetContainerContext } from '../MultisetContainerContext'

interface TooltipProps {
    visible: boolean
    target: string
}


function FilterTooltip(props: TooltipProps) {
    return (
        <Tooltip
            className='MultisetContainerFilterTooltip'
            target={props.target}
            visible={props.visible}
        >
            <FilterLabel />
        </Tooltip>
    )
}

export default React.memo(FilterTooltip)

const FilterLabel = React.memo(() => {
    const context = useMultisetContainerContext()
    const metric = useSelector<MultisetContainerStore, string>(metricSelector)
    const sets = useSelector<MultisetContainerStore, Array<BaseSetState>>(setsSelector)

    const fields = useMemo(() => getSetDataFields(), [])

    const [displayFilter, setDisplayFilter] = useState<Array<any>>([])

    useEffect(() => {
        (async () => {
            Promise.all(sets.map(set => context.filterLabel.fetchDisplayFilter(metric, set)))
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
    }, [metric, sets])

    if (displayFilter.length < 1)
        return <div>No filters</div>
    return <FilterBuilder
        className='MultisetContainerFilterLabel'
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
