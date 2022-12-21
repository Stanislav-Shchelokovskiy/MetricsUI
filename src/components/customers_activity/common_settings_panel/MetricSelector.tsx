import React, { useMemo } from 'react'
import { OptionSelector } from '../../common/components/OptionSelector'
import { changeMetric } from '../store/Actions'
import { useCustomersActivityDispatch, useCustomersActivitySelector, CustomersActivityStore } from '../store/Store'


const TICKETS = 'Tickets'
const ITERATIONS = 'Iterations'
const PEOPLE = 'People'


export const isTicketsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === TICKETS
}

export const isIterationsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === ITERATIONS
}


export default function MetricSelector() {
    const metrics = useMemo<Array<string>>(() => { return [TICKETS, ITERATIONS, PEOPLE] }, [])
    let selectedMetric = useCustomersActivitySelector((store: CustomersActivityStore) => store.customersActivity.metric)

    const appDipatch = useCustomersActivityDispatch()
    const onMetricChange: (metric: string) => void = (metric: string) => {
        appDipatch(changeMetric(metric))
    }

    if (!selectedMetric) {
        selectedMetric = TICKETS
        appDipatch(changeMetric(selectedMetric))
    }

    return (
        <OptionSelector
            className='CustomersActivity_MetricSelector'
            dataSource={metrics}
            defaultValue={selectedMetric}
            value={selectedMetric}
            onValueChange={onMetricChange}
            label='Metric'/>
    )
} 
