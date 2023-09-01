import React from 'react'
import ThreeStateSelectorSelector from '../../../common/components/ThreeStateSelectorSelector'
import { useSelector } from 'react-redux'
import { PerformanceMetricsStore } from '../../store/Store'
import { changeTrainee, changeTraineeInclude } from '../../store/sets/Actions'
import { traineeSelector } from '../../store/sets/Selectors'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'

export default function TraineeSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: PerformanceMetricsStore) => traineeSelector(state, setTitle))
    const onValueChange = (value: boolean | null | undefined) => {
        if (value == null)
            return changeTraineeInclude({ stateId: setTitle, data: false })
        return changeTrainee({ stateId: setTitle, data: value })
    }
    return <ThreeStateSelectorSelector
        text='Trainee'
        onValueChange={onValueChange}
        value={value}
    />
} 
