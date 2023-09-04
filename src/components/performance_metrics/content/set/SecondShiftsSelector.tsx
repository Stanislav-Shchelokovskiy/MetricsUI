import React from 'react'
import ThreeStateSelectorSelector from '../../../common/components/ThreeStateSelectorSelector'
import { useSelector } from 'react-redux'
import { PerformanceMetricsStore } from '../../store/Store'
import { changeSecondShifts, changeSecondShiftsInclude } from '../../store/sets/Actions'
import { secondShiftsSelector } from '../../store/sets/Selectors'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { FilterParameterNode } from '../../../common/store/multiset_container/sets/Interfaces'

export default function SecondShiftsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: PerformanceMetricsStore) => secondShiftsSelector(state, setTitle)) as FilterParameterNode<boolean>
    const onValueChange = (value: boolean | null | undefined) => {
        if (value == null)
            return changeSecondShiftsInclude({ stateId: setTitle, data: false })
        return changeSecondShifts({ stateId: setTitle, data: value })
    }
    return <ThreeStateSelectorSelector
        text='Second Shifts'
        onValueChange={onValueChange}
        defaultValue={value?.value}
    />
} 
