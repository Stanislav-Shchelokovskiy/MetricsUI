import React, { useMemo } from 'react'
import { OptionSelector } from '../../common/components/OptionSelector'
import { useAppDispatch, useAppSelector, AppStore } from '../../common/AppStore'
import { changeComparisonMethod } from '../store/Actions'


const ABSOLUTE = 'Absolute'
const RELATIVE = 'Relative'

export const isAbsoluteComparisonMethodSelected: (method: string) => boolean = (metric: string) => {
    return metric === ABSOLUTE
}


export default function ComparisonMethodSelector() {
    const comparisonMethods = useMemo<Array<string>>(() => { return [ABSOLUTE, RELATIVE] }, [])
    let selectedComparisonMethod = useAppSelector((store: AppStore) => store.customersActivity.comparisonMethod)

    const appDispatch = useAppDispatch()
    const onComparisonMethodChange: (comparisonMethod: string) => void = (comparisonMethod: string) => {
        appDispatch(changeComparisonMethod(comparisonMethod))
    }

    if (!selectedComparisonMethod) {
        selectedComparisonMethod = ABSOLUTE
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
