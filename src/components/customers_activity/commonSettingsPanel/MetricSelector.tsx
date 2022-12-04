import React, { useMemo } from 'react'
import OptionSelector from '../../common/components/OptionSelector'
import { changeMetric } from '../store/Actions'
import { useAppDispatch, useAppSelector, AppStore } from '../../common/AppStore'


const TICKETS = 'Tickets'
const ITERATIONS = 'Iterations'


export const isTicketsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === TICKETS
}


export default function MetricSelector() {
    const metrics = useMemo<Array<string>>(() => { return [TICKETS, ITERATIONS] }, [])
    let selectedMetric = useAppSelector((store: AppStore) => store.customersActivity.metric)

    const appDipatch = useAppDispatch()
    const onMetricChange: (metric: string) => void = (metric: string) => {
        appDipatch(changeMetric(metric))
    }

    if (!selectedMetric) {
        selectedMetric = TICKETS
        appDipatch(changeMetric(selectedMetric))
    }

    return <OptionSelector<string, string>
        className='CustomersActivity_MetricSelector'
        dataSource={metrics}
        selectedValue={selectedMetric}
        onValueChange={onMetricChange}
        label='Metric' />
} 
