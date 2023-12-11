import React from 'react'
import { changeClosedBy, changeClosedByInclude } from '../../../../store/actions/Bugs'
import { EmpSelector } from '../employees/EmployeesSelector'
import { ClosedBugsSelectorWrapper } from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { closedBySelector, closedBySelectorName } from '../../../../store/sets/Selectors'


export default function ClosedBySelector() {
    const setTitle = useSetTitle()
    return <ClosedBugsSelectorWrapper
        Wrapped={EmpSelector}
        setTitle={setTitle}
        placeholder='Select who closed bugs'
        label='Bugs closed by'
        valueSelector={closedBySelector}
        changeSelection={changeClosedBy}
        changeInclude={changeClosedByInclude}
        decomposePropName={closedBySelectorName}
    />
}
