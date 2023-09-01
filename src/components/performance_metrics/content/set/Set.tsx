import React from 'react'
import SetWithHeader from '../../../common/components/multiset_container/set/Set'
import { SetProps } from '../../../common/components/multiset_container/MultisetContainer'
import TentsSelector from './Tents'
import EmpTentsSelector from './EmpTents'
import EmpPositionsSelector from './Positions'
import TraineeSelector from './TraineeSelector'
import JuniorSelector from './JuniorSelector'
import EmployeesSelector from './Employees'
import SecondShiftsSelector from './SecondShiftsSelector'



function Set({ setTitle }: SetProps) {
    return <SetWithHeader setTitle={setTitle}>
        <TentsSelector />
        <EmpTentsSelector />
        <EmpPositionsSelector />
        <TraineeSelector />
        <JuniorSelector />
        <EmployeesSelector />
        <SecondShiftsSelector />
    </SetWithHeader>
}

export default React.memo(Set)
