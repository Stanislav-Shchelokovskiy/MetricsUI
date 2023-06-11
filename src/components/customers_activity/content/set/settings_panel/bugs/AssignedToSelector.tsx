import React, { useCallback } from 'react'
import { changeAssignedTo, changeAssignedToInclude } from '../../../../store/actions/Bugs'
import { SetState } from '../../../../store/sets_reducer/Interfaces'
import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'


export default function AssignedToSelector() {
    const setTitle = useSetTitle()
    const valueSelector = useCallback((x: SetState | undefined) => x?.assignedTo, [])
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
