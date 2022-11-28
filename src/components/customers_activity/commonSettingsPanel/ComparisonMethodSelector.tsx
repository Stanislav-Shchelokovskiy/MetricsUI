import React, { useMemo, useRef } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import { useAppDispatch, useAppSelector, AppStore } from '../../common/AppStore'
import { changeComparisonMethod } from '../store/Actions'


const ABSOLUTE = 'Absolute'
const RELATIVE = 'Relative'

export const isAbsoluteComparisonMethodSelected: (method: string) => boolean = (metric: string) => {
    return metric === ABSOLUTE
}


export default function ComparisonMethodSelector() {
    const renderCount = useRef(0)
    console.log('ComparisonMethodSelector render ', renderCount.current++)

    const comparisonMethods = useMemo<Array<string>>(() => { return [ABSOLUTE, RELATIVE] }, [])
    const selectedComparisonMethod = useAppSelector((store: AppStore) => store.customersActivity.comparisonMethod)

    const appDispatch = useAppDispatch()
    const onComparisonMethodChange: (comparisonMethod: string) => void = (comparisonMethod: string) => {
        appDispatch(changeComparisonMethod(comparisonMethod))
    }

    if (!selectedComparisonMethod) {
        appDispatch(changeComparisonMethod(ABSOLUTE))
    }

    return (
        <SelectBox
            className='CustomersActivity_ComparisonMethodSelector'
            dataSource={comparisonMethods}
            defaultValue={selectedComparisonMethod}
            onValueChange={onComparisonMethodChange}
            label='Comparison method'
            labelMode='static'>
            <DropDownOptions
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </SelectBox >
    )
} 
