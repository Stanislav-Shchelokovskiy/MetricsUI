import React from 'react'
import ThreeStateSelectorSelector from '../../../common/components/ThreeStateSelectorSelector'
import { useSelector } from 'react-redux'
import { PerformanceMetricsStore } from '../../store/Store'
import { changeJunior, changeJuniorInclude } from '../../store/sets/Actions'
import { juniorSelector } from '../../store/sets/Selectors'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { FilterParameterNode } from '../../../common/store/multiset_container/sets/Interfaces'


export default function JuniorSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: PerformanceMetricsStore) => juniorSelector(state, setTitle)) as FilterParameterNode<boolean>
    const onValueChange = (value: boolean | null | undefined) => {
        if (value == null)
            return changeJuniorInclude({ stateId: setTitle, data: false })
        return changeJunior({ stateId: setTitle, data: value })
    }
    return <ThreeStateSelectorSelector
        text='Junior'
        onValueChange={onValueChange}
        defaultValue={value?.value}
    />
} 
