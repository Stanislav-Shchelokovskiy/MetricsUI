import React from 'react'
import OptionSelector from '../../common/components/OptionSelector'
import { changeMetric } from '../store/actions/Common'
import { CustomersActivityStore } from '../store/Store'


const TICKETS = 'Tickets'
const ITERATIONS = 'Iterations'
const PEOPLE = 'People'
const ITERATIONS_TO_TICKETS = 'Iterations / Tickets'
const metrics = [TICKETS, ITERATIONS, ITERATIONS_TO_TICKETS, PEOPLE]

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

export const isIterationsToTicketsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === ITERATIONS_TO_TICKETS
}


export default function MetricSelector() {
    const valueSelector = (store: CustomersActivityStore) => store.customersActivity.metric

    return <OptionSelector
        className='CustomersActivity_MetricSelector'
        dataSource={metrics}
        valueSelector={valueSelector}
        onValueChange={changeMetric}
        label='Metric'
    />
} 
