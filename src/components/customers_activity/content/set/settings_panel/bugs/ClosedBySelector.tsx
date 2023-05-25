import React, { useCallback } from 'react'
import { changeClosedBy, changeClosedByInclude } from '../../../../store/actions/Bugs'
import { SetState } from '../../../../store/sets_reducer/Interfaces'
import { EmpSelector } from '../employees/EmployeesSelector'
import { ClosedBugsSelectorWrapper } from './BugsSelectors'


export default function ClosedBySelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: SetState | undefined) => x?.closedBy, [])
    const tribesSelector = useCallback((x: SetState | undefined) => x?.tribes, [])
    return <ClosedBugsSelectorWrapper
        Wrapped={EmpSelector}
        setTitle={setTitle}
        className='CustomersActivity_ClosedBySelector'
        placeholder='Select who closed bugs'
        label='Bugs closed by'
        valueSelector={valueSelector}
        changeSelection={changeClosedBy}
        changeInclude={changeClosedByInclude}
        tribesSelector={tribesSelector}
    />
}
