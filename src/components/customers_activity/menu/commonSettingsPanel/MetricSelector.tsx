import React, { useMemo } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import { changeMetric } from '../../store/Actions'
import { useAppDispatch, useAppSelector, AppStore } from '../../../common/AppStore'

const TICKETS = 'Tickets'
const ITERATIONS = 'Iterations'

export const isTicketsMetricSelected: (metric: string) => boolean = (metric: string) => {
    return metric === TICKETS
}

export default function MetricSelector() {
    const metrics = useMemo<Array<string>>(() => { return [TICKETS, ITERATIONS] }, [])
    const selectedMetric = useAppSelector((store: AppStore) => store.customersActivity.metric) || metrics[0]

    const appDipatch = useAppDispatch()
    const onMetricChange: (metric: string) => void = (metric: string) => {
        appDipatch(changeMetric(metric))
    }
    return (
        <SelectBox
            className='CustomersActivity_MetricSelector'
            dataSource={metrics}
            defaultValue={selectedMetric}
            onValueChange={onMetricChange}
            label='Metric'
            labelMode='static'>
            <DropDownOptions
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </SelectBox >
    )
} 
