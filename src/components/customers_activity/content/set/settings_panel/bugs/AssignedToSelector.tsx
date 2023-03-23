import React, { useCallback } from 'react'
import { changeAssignedTo, changeAssignedToInclude } from '../../../../store/actions/Bugs'
import { Set } from '../../../../store/SetsReducer'
import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelector'


export default function AssignedToSelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: Set | undefined) => x?.assignedTo, [])
    return <BugsSelectorWrapper
        Wrapped={EmpSelector}
        setTitle={setTitle}
        className='CustomersActivity_AssignedToSelector'
        placeholder='Select whom bugs are assigned to'
        label='Bugs assigned to'
        valueSelector={valueSelector}
        changeSelection={changeAssignedTo}
        changeInclude={changeAssignedToInclude}
    />
}
