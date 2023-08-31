import React, { useCallback } from 'react'
import OptionSelector from '../../OptionSelector'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { changeGroupByPeriod } from '../../../store/multiset_container/Actions'
import { TAKE_FROM_DEFAULT_SELECTOR } from '../../../store/multiset_container/Utils'
import { useMultisetContainerContext } from '../MultisetContainerContext'

export interface GroupByPeriod {
    name: string
    format: string
}

export default function GroupByPeriodSelector() {
    const context = useMultisetContainerContext()
    const valueSelector = useCallback((store: MultisetContainerStore) => store.container.groupByPeriod, [])
    const defaultValueSelector = useCallback((values: Array<GroupByPeriod>) => values[0]?.format, [])

    return <OptionSelector<GroupByPeriod, string>
        className='ComparisonGraph_GroupByPeriodSelector'
        displayExpr='name'
        valueExpr='format'
        fetchDataSource={context.graphSettingsPanel.fetchGroupByPeriods}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeGroupByPeriod}
        label='Group by'
        hideIfEmpty={true}
    />
}

export function getValidGroupByPeriodOrDefault(value: string | undefined) {
    return value ? value : TAKE_FROM_DEFAULT_SELECTOR
}
