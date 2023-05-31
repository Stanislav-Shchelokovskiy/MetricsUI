import React, { useCallback } from 'react'
import FetchResult from '../../../Interfaces'
import OptionSelector from '../../OptionSelector'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { changeGroupByPeriod } from '../../../store/multiset_container/Actions'

interface GroupByPeriod {
    name: string
    format: string
}

export interface Props {
    groupByPeriodSelectorClassName: string | undefined
    fetchGroupByPeriods: (...args: any) => Promise<FetchResult<Array<GroupByPeriod>>>
}

export default function GroupByPeriodSelector(props: Props) {
    const valueSelector = (store: MultisetContainerStore) => store.container.groupByPeriod
    const defaultValueSelector = (values: Array<GroupByPeriod>) => values[0]?.format

    return <OptionSelector<GroupByPeriod, string>
        className={props.groupByPeriodSelectorClassName}
        displayExpr='name'
        valueExpr='format'
        fetchDataSource={props.fetchGroupByPeriods}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeGroupByPeriod}
        label='Group by'
    />
}

export function getValidGroupByPeriodOrDefault(value: string | undefined) {
    return value ? value : 'takeFromValues'
}
