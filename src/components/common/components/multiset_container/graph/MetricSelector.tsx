import React from 'react'
import FetchResult from '../../../Interfaces'
import OptionSelector from '../../OptionSelector'
import { changeMetric } from '../../../store/multiset_container/Actions'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { DataSourceProps } from '../../../hooks/UseDataSource'

interface Metric {
    name: string
}

export interface Props {
    metricSelectorClassName: string | undefined
    fetchMetrics: (...args: any) => Promise<FetchResult<Array<Metric>>>
}

export default function MetricSelector(props: Props) {
    const valueSelector = (store: MultisetContainerStore) => store.container.metric
    const defaultValueSelector = (values: Array<Metric>) => values[0]?.name

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
    return value ? value : 'takeFromValues'
}
