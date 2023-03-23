import React, { useCallback } from 'react'
import DateBox from 'devextreme-react/date-box'
import TextBox from 'devextreme-react/text-box'
import { changeClosedBy, changeClosedByInclude } from '../../../../store/actions/Bugs'
//import { Employee } from '../../../../network_resource_fetcher/employees/FetchEmployees'
import { Set } from '../../../../store/SetsReducer'
//import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelector'


export default function ClosedOnSelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: Set | undefined) => undefined, [])
    return <BugsSelectorWrapper
        Wrapped={DateBox}
        setTitle={setTitle}
        className='CustomersActivity_ClosedOnSelector'
        placeholder='Select who closed bugs'
        label='Bugs closed between'
        valueSelector={valueSelector}
        changeSelection={changeClosedBy}
        changeInclude={changeClosedByInclude}
    />
}