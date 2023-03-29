import React, { useCallback } from 'react'
import { changeFixedBy, changeFixedByInclude } from '../../../../store/actions/Bugs'
import { Set } from '../../../../store/SetsReducer'
import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelectors'


export default function FixedBySelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: Set | undefined) => x?.fixedBy, [])
    return <BugsSelectorWrapper
        Wrapped={EmpSelector}
        setTitle={setTitle}
        className='CustomersActivity_FixedBySelector'
        placeholder='Select who set fixed in version'
        label='Bugs fixed by'
        valueSelector={valueSelector}
        changeSelection={changeFixedBy}
        changeInclude={changeFixedByInclude}
    />
}