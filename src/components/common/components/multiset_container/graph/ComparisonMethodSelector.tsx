import React from 'react'
import OptionSelector from '../../OptionSelector'
import { MultisetContainerStore } from '../../../store/multiset_container/Store'
import { BaseContainerState } from '../../../store/multiset_container/BaseContainerState'
import { changeComparisonMethod } from '../../../store/multiset_container/Actions'


const ABSOLUTE_BAR = 'Absolute (Bar)'
const ABSOLUTE_AREA = 'Absolute (Area)'
const RELATIVE = 'Relative'
const comparisonMethods = [ABSOLUTE_AREA, ABSOLUTE_BAR, RELATIVE]

export function comparisonMethodOrDefault(currentValue: string | undefined) {
    if (currentValue !== undefined && comparisonMethods.includes(currentValue))
        return currentValue
    return ABSOLUTE_BAR
}

export const isAbsoluteBarSelected: (method: string) => boolean = (metric: string) => {
    return metric === ABSOLUTE_BAR
}

export const isAbsoluteAreaSelected: (method: string) => boolean = (metric: string) => {
    return metric === ABSOLUTE_AREA
}

export default function ComparisonMethodSelector() {
    const valueSelector = (store: MultisetContainerStore<BaseContainerState>) => store.container.comparisonMethod
    return (
        <OptionSelector
            className='ComparisonGraph_ComparisonMethodSelector'
            dataSource={comparisonMethods}
            valueSelector={valueSelector}
            onValueChange={changeComparisonMethod}
            label='Comparison method' />
    )
}
