import React from 'react'
import { changeAssignedTo, changeAssignedToInclude } from '../../../../store/actions/Bugs'
import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { assignedToSelector } from '../../../../store/sets_reducer/Selectors'


export default function AssignedToSelector() {
    const setTitle = useSetTitle()
    return <BugsSelectorWrapper
        Wrapped={EmpSelector}
        setTitle={setTitle}
        className='CustomersActivity_AssignedToSelector'
        placeholder='Select whom bugs are assigned to'
        label='Bugs assigned to'
        valueSelector={assignedToSelector}
        changeSelection={changeAssignedTo}
        changeInclude={changeAssignedToInclude}
    />
}
