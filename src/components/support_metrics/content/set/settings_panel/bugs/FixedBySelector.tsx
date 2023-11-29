import React from 'react'
import { changeFixedBy, changeFixedByInclude } from '../../../../store/actions/Bugs'
import { EmpSelector } from '../employees/EmployeesSelector'
import BugsSelectorWrapper from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { fixedBySelector } from '../../../../store/sets/Selectors'


export default function FixedBySelector() {
    const setTitle = useSetTitle()
    return <BugsSelectorWrapper
        Wrapped={EmpSelector}
        setTitle={setTitle}
        className='CustomersActivity_FixedBySelector'
        placeholder='Select who set fixed in version'
        label='Fixed by'
        valueSelector={fixedBySelector}
        changeSelection={changeFixedBy}
        changeInclude={changeFixedByInclude}
    />
}
