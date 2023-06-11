import React, { useCallback } from 'react'
import OptionSelector from '../../OptionSelector'
import { changeMetric } from '../../../store/multiset_container/Actions'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { TAKE_FROM_DEFAULT_SELECTOR } from '../../../store/multiset_container/Utils'
import { useMultisetContainerContext } from '../MultisetContainerContext'

export interface Metric {
    name: string
}

export default function MetricSelector() {
    const context = useMultisetContainerContext()
    const valueSelector = useCallback((store: MultisetContainerStore) => store.container.metric, [])
    const defaultValueSelector = useCallback((values: Array<Metric>) => values[0]?.name, [])

    return <OptionSelector
        className='ComparisonGraph_MetricSelector'
        displayExpr='name'
        valueExpr='name'
        fetchDataSource={context.graphSettingsPanel.fetchMetrics}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeMetric}
        label='Metric'
    />
}

export function getValidMetricOrDefault(value: string | undefined) {
    return value ? value : TAKE_FROM_DEFAULT_SELECTOR
}
