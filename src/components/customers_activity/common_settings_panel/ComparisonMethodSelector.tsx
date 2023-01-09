import React from 'react'
import OptionSelector from '../../common/components/OptionSelector'
import { CustomersActivityStore } from '../store/Store'
import { changeComparisonMethod } from '../store/Actions'


const ABSOLUTE_BAR = 'Absolute (Bar)'
const ABSOLUTE_AREA = 'Absolute (Area)'
const RELATIVE = 'Relative'
const comparisonMethods = [ABSOLUTE_AREA, ABSOLUTE_BAR, RELATIVE]

export function getValidComparisonMethodOrDefault(currentValue: string | undefined) {
    if (currentValue !== undefined && comparisonMethods.includes(currentValue))
        return currentValue
    return ABSOLUTE_AREA
}

export const isAbsoluteBarSelected: (method: string) => boolean = (metric: string) => {
    return metric === ABSOLUTE_BAR
}

export const isAbsoluteAreaSelected: (method: string) => boolean = (metric: string) => {
    return metric === ABSOLUTE_AREA
}


export default function ComparisonMethodSelector() {
    const valueSelector = (store: CustomersActivityStore) => store.customersActivity.comparisonMethod
    return (
        <OptionSelector
            className='CustomersActivity_ComparisonMethodSelector'
            dataSource={comparisonMethods}
            valueSelector={valueSelector}
            onValueChange={changeComparisonMethod}
            label='Comparison method' />
    )
} 
