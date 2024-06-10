import React from 'react'
import { changeAssignedTo, changeAssignedToInclude } from '../../../../store/actions/Bugs'
import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { assignedToSelector, assignedToSelectorName } from '../../../../store/sets/Selectors'


export default function AssignedToSelector() {
    const setTitle = useSetTitle()
    return <BugsSelectorWrapper
        Wrapped={EmpSelector}
        setTitle={setTitle}
        placeholder='Select whom bugs are assigned to'
        label='Bugs assigned to'
        valueSelector={assignedToSelector}
        changeSelection={changeAssignedTo}
        changeInclude={changeAssignedToInclude}
        decomposePropName={assignedToSelectorName}
    />
}
