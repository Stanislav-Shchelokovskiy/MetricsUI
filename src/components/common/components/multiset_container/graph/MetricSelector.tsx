import React, { useCallback } from 'react'
import OptionSelector from '../../OptionSelector'
import { changeMetric } from '../../../store/multiset_container/Actions'
import { TAKE_FROM_DEFAULT_SELECTOR } from '../../../store/multiset_container/Utils'
import { useMultisetContainerContext } from '../MultisetContainerContext'
import { metricSelector } from '../../../store/multiset_container/Selectors'


export interface Metric {
    name: string
    context: number
}

export default function MetricSelector() {
    const context = useMultisetContainerContext()
    const defaultValueSelector = useCallback((values: Array<Metric>) => values[0]?.name, [])
    const onValueChangeEx = useCallback((dsVal: Metric) => {
        context.changeContext(dsVal.context)
    }, [])

    return <OptionSelector
        className='ComparisonGraph_MetricSelector'
        displayExpr='name'
        valueExpr='name'
        fetchDataSource={context.fetchMetrics}
        valueSelector={metricSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeMetric}
        onValueChangeEx={onValueChangeEx}
        label='Metric'
    />
}

export function getValidMetricOrDefault(value: string | undefined) {
    return value ? value : TAKE_FROM_DEFAULT_SELECTOR
}
