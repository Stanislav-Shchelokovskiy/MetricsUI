import React from 'react'
import SetWithHeader from '../../../common/components/multiset_container/set/Set'
import { SetProps } from '../../../common/components/multiset_container/MultisetContainer'
import EmpTribesSelector from './TribesSelector'
import EmpPositionsSelector from './Positions'
import EmployeesSelector from './Employees'


function Set({ setTitle }: SetProps) {
    return <SetWithHeader setTitle={setTitle}>
        <EmpTribesSelector setTitle={setTitle} />
        <EmpPositionsSelector setTitle={setTitle} />
        <EmployeesSelector setTitle={setTitle} />
    </SetWithHeader>
}

export default React.memo(Set)
