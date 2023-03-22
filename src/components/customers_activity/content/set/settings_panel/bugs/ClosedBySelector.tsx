import React, { useCallback } from 'react'
import { changeClosedBy, changeClosedByInclude } from '../../../../store/actions/Bugs'
import { Employee } from '../../../../network_resource_fetcher/employees/FetchEmployees'
import { Set } from '../../../../store/SetsReducer'
import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelector'


export default function ClosedBySelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: Set | undefined) => x?.closedBy, [])
    return <BugsSelectorWrapper<Employee, string>
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
