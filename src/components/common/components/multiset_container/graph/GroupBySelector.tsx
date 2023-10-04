import React, { useCallback } from 'react'
import OptionSelector from '../../OptionSelector'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { changeGroupBy } from '../../../store/multiset_container/Actions'
import { useMultisetContainerContext } from '../MultisetContainerContext'
import { Context, isPerformanceContextSelected } from '../../../store/multiset_container/Context'

export interface GroupBy {
    name: string
    format: string
}

export default function GroupBySelector() {
    const context = useMultisetContainerContext()
    const valueSelector = useCallback((store: MultisetContainerStore) => store.container.groupBy, [])
    const defaultValueSelector = useCallback((values: Array<GroupBy>) => groupByOrDefault(undefined, context.context), [context.context])

    return <OptionSelector<GroupBy, string>
        className='ComparisonGraph_GroupBySelector'
        displayExpr='name'
        valueExpr='format'
        fetchDataSource={context.graphSettingsPanel.fetchGroupBys}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeGroupBy}
        label='Group by'
        hideIfEmpty={true}
    />
}

export function groupByOrDefault(value: string | undefined, context: Context) {
    const ym = '%Y-%m'
    const tent = 'Tent'
    if (value) {
        if (isPerformanceContextSelected(context)) {
            if (value.startsWith('%Y'))
                return tent
        } else if (!value.startsWith('%Y')) {
            return ym
        }
        return value
    }

    if (isPerformanceContextSelected(context))
        return tent
    return ym
}
