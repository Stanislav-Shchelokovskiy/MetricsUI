import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OptionSelector } from '../../common/components/OptionSelector'
import { changeMetric } from '../store/Actions'
import { CustomersActivityStore } from '../store/Store'


const TICKETS = 'Tickets'
const ITERATIONS = 'Iterations'
const PEOPLE = 'People'
const metrics = [TICKETS, ITERATIONS, PEOPLE]

export function getValidMetricOrDefault(currentValue: string | undefined) {
    if (currentValue !== undefined && metrics.includes(currentValue))
        return currentValue
    return TICKETS
}


export const isTicketsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === TICKETS
}

export const isIterationsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === ITERATIONS
}


export default function MetricSelector() {
    const selectedMetric = useSelector((store: CustomersActivityStore) => store.customersActivity.metric)

    const dipatch = useDispatch()
    const onMetricChange: (metric: string) => void = (metric: string) => {
        dipatch(changeMetric(metric))
    }

    return <OptionSelector
        className='CustomersActivity_MetricSelector'
        dataSource={metrics}
        defaultValue={selectedMetric}
        value={selectedMetric}
        onValueChange={onMetricChange}
        label='Metric'
    />
} 
