import React, { useCallback } from 'react'
import FetchResult from '../../../Interfaces'
import OptionSelector from '../../OptionSelector'
import { changeMetric } from '../../../store/multiset_container/Actions'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { TAKE_FROM_DEFAULT_SELECTOR } from '../../../store/multiset_container/Utils'

interface Metric {
    name: string
}

export interface Props {
    metricSelectorClassName: string | undefined
    fetchMetrics: (...args: any) => Promise<FetchResult<Array<Metric>>>
}

export default function MetricSelector(props: Props) {
    const valueSelector = useCallback((store: MultisetContainerStore) => store.container.metric, [])
    const defaultValueSelector = useCallback((values: Array<Metric>) => values[0]?.name, [])

    return <OptionSelector
        className={props.metricSelectorClassName}
        displayExpr='name'
        valueExpr='name'
        fetchDataSource={props.fetchMetrics}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeMetric}
        label='Metric'
    />
}

export function getValidMetricOrDefault(value: string | undefined) {
    return value ? value : TAKE_FROM_DEFAULT_SELECTOR
}
