import React, { useCallback } from 'react'
import NumericSelector from '../../../../../common/components/NumericSelector'
import { useSelector } from 'react-redux'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeResolutionTime } from '../../../../store/actions/Tickets'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { resolutionTimeSelector } from '../../../../store/sets/Selectors'


export default function ResolutionTimeSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => resolutionTimeSelector(store, setTitle)?.value)
    const onValueChange = (value: number | undefined) => changeResolutionTime({ stateId: setTitle, data: value ? value : undefined })
    const format = useCallback((value: number | undefined) => {
        return value ? `less than ${Math.round(value)} hour(s)` : ''
    }, [])
    
    return <NumericSelector
        className='CustomersActivity_SingleSelector'
        min={0}
        step={1}
        defaultValue={0}
        format={format}
        currentValue={value}
        onValueChange={onValueChange}
        placeholder='Any number of hours'
        label='Ticket resolution time'
        spinDelay={700}
    />
}
