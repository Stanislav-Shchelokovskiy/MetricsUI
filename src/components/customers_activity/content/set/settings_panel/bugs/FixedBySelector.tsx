import React, { useCallback } from 'react'
import { changeFixedBy, changeFixedByInclude } from '../../../../store/actions/Bugs'
import { SetState } from '../../../../store/sets_reducer/Interfaces'
import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'


export default function FixedBySelector() {
    const setTitle = useSetTitle()
    const valueSelector = useCallback((x: SetState | undefined) => x?.fixedBy, [])
    const tribesSelector = useCallback((x: SetState | undefined) => x?.tribes, [])
    return <BugsSelectorWrapper
        Wrapped={EmpSelector}
        setTitle={setTitle}
        className='CustomersActivity_FixedBySelector'
        placeholder='Select who set fixed in version'
        label='Fixed by'
        valueSelector={valueSelector}
        changeSelection={changeFixedBy}
        changeInclude={changeFixedByInclude}
        tribesSelector={tribesSelector}
    />
}
