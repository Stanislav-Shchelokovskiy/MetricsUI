import React from 'react'
import SetWithHeader from '../../../common/components/multiset_container/set/Set'
import { SetProps } from '../../../common/components/multiset_container/MultisetContainer'
import EmpTeamsSelector from './Teams'
import EmpTribesSelector from './TribesSelector'
import EmpPositionsSelector from './Positions'
import EmployeesSelector from './Employees'


function Set({ setTitle }: SetProps) {
    return <SetWithHeader setTitle={setTitle}>
        <EmpTeamsSelector />
        <EmpTribesSelector />
        <EmpPositionsSelector />
        <EmployeesSelector />
    </SetWithHeader>
}

export default React.memo(Set)
