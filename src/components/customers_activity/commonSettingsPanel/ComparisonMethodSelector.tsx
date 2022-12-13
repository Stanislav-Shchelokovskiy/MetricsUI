import React, { useMemo } from 'react'
import { OptionSelector } from '../../common/components/OptionSelector'
import { useCustomersActivityDispatch, useCustomersActivitySelector, CustomersActivityStore } from '../store/Store'
import { changeComparisonMethod } from '../store/Actions'


const ABSOLUTE_BAR = 'Absolute (Bar)'
const ABSOLUTE_AREA = 'Absolute (Area)'
const RELATIVE = 'Relative'

export const isAbsoluteBarSelected: (method: string) => boolean = (metric: string) => {
    return metric === ABSOLUTE_BAR
}

export const isAbsoluteAreaSelected: (method: string) => boolean = (metric: string) => {
    return metric === ABSOLUTE_AREA
}


export default function ComparisonMethodSelector() {
    const comparisonMethods = useMemo<Array<string>>(() => { return [ABSOLUTE_AREA, ABSOLUTE_BAR, RELATIVE] }, [])
    let selectedComparisonMethod = useCustomersActivitySelector((store: CustomersActivityStore) => store.customersActivity.comparisonMethod)

    const appDispatch = useCustomersActivityDispatch()
    const onComparisonMethodChange: (comparisonMethod: string) => void = (comparisonMethod: string) => {
        appDispatch(changeComparisonMethod(comparisonMethod))
    }

    if (!selectedComparisonMethod) {
        selectedComparisonMethod = ABSOLUTE_AREA
        appDispatch(changeComparisonMethod(selectedComparisonMethod))
    }

    return (
        <OptionSelector
            className='CustomersActivity_ComparisonMethodSelector'
            dataSource={comparisonMethods}
            defaultValue={selectedComparisonMethod}
            onValueChange={onComparisonMethodChange}
            label='Comparison method' />
    )
} 
