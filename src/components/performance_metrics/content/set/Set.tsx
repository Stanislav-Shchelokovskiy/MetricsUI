import React from 'react'
import SetWithHeader from '../../../common/components/multiset_container/set/Set'
import { SetProps } from '../../../common/components/multiset_container/MultisetContainer'
import TentsSelector from './Tents'
import EmpTentsSelector from './EmpTents'
import EmpPositionsSelector from './Positions'
import EmployeesSelector from './Employees'


function Set({ setTitle }: SetProps) {
    return <SetWithHeader setTitle={setTitle}>
        <TentsSelector />
        <EmpTentsSelector />
        <EmpPositionsSelector />
        <EmployeesSelector />
    </SetWithHeader>
}

export default React.memo(Set)
