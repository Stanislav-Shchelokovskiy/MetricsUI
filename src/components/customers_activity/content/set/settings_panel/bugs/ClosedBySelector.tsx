import React, { useCallback } from 'react'
import { changeClosedBy, changeClosedByInclude } from '../../../../store/actions/Bugs'
import { Set } from '../../../../store/SetsReducer'
import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelector'


export default function ClosedBySelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: Set | undefined) => x?.closedBy, [])
    return <BugsSelectorWrapper
        Wrapped={EmpSelector}
        setTitle={setTitle}
        className='CustomersActivity_ClosedBySelector'
        placeholder='Select who closed bugs'
        label='Bugs closed by'
        valueSelector={valueSelector}
        changeSelection={changeClosedBy}
        changeInclude={changeClosedByInclude}
    />
}
