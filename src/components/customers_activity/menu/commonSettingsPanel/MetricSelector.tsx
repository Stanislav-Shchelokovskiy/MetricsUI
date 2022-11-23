import React, { useReducer, useEffect, useMemo } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import LoadIndicator from '../../../common/LoadIndicator'
import { changeMetric } from '../../store/Actions'
import { useAppDispatch, useAppSelector, AppStore } from '../../../common/AppStore'

export default function MetricSelector() {
    const metrics = useMemo<Array<string>>(() => { return ['Tickets', 'Iterations'] }, [])
    // const [groupByPeriod, setGroupByPeriod] = useState(groupByPeriods[0])
    const selectedMetric = useAppSelector((store: AppStore) => store.customersActivity.metric) || metrics[0]

    const appDipatch = useAppDispatch()
    const onMetricChange: (metric: string) => void = (metric: string) => {
        //setGroupByPeriod(groupByPeriod)
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
