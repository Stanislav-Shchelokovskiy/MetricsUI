import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OptionSelector } from '../../common/components/OptionSelector'
import { CustomersActivityStore } from '../store/Store'
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
    let selectedComparisonMethod = useSelector((store: CustomersActivityStore) => store.customersActivity.comparisonMethod)

    const dispatch = useDispatch()
    const onComparisonMethodChange: (comparisonMethod: string) => void = (comparisonMethod: string) => {
        dispatch(changeComparisonMethod(comparisonMethod))
    }

    if (!selectedComparisonMethod) {
        selectedComparisonMethod = ABSOLUTE_AREA
        dispatch(changeComparisonMethod(selectedComparisonMethod))
    }

    return (
        <OptionSelector
            className='CustomersActivity_ComparisonMethodSelector'
            dataSource={comparisonMethods}
            defaultValue={selectedComparisonMethod}
            value={selectedComparisonMethod}
            onValueChange={onComparisonMethodChange}
            label='Comparison method' />
    )
} 
