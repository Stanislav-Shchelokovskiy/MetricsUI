import React, { useCallback } from 'react'
import OptionSelector from '../../OptionSelector'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { changeGroupBy } from '../../../store/multiset_container/Actions'
import { useMultisetContainerContext } from '../MultisetContainerContext'

export interface GroupBy {
    name: string
    format: string
}

export default function GroupBySelector() {
    const context = useMultisetContainerContext()
    const valueSelector = useCallback((store: MultisetContainerStore) => store.container.groupBy, [])
    const defaultValueSelector = useCallback((values: Array<GroupBy>) => values[0]?.format, [])

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

export function getValidGroupByOrDefault(value: string | undefined) {
    return value ? value : '%Y-%W'
}
