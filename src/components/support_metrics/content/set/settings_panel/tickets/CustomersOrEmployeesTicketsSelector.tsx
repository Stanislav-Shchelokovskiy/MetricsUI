import React, { useMemo } from 'react'
import OptionSelector from '../../../../../common/components/OptionSelector'
import { changeEmployeeTickets } from '../../../../store/actions/Tickets'
import { SupportMetricsStore } from '../../../../store/Store'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { employesTicketsSelector } from '../../../../store/sets/Selectors'

interface Privacy {
    id: number
    name: string
}

export default function CustomersOrEmployeesTicketsSelector() {
    const setTitle = useSetTitle()
    const ds = useMemo(() => [{ id: 0, name: 'Customer' }, { id: 1, name: 'Employee' }], [])
    const valueSelector = (store: SupportMetricsStore) => employesTicketsSelector(store, setTitle)?.value
    const onValueChange = (value: number | undefined) => changeEmployeeTickets({ stateId: setTitle, data: value === null ? undefined : value })

    return <OptionSelector<Privacy, number | undefined>
        className='CustomersActivity_SingleSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Customer or employee'
        dataSource={ds}
        valueSelector={valueSelector}
        onValueChange={onValueChange}
        label='Ticket owner'
        showDropDownButton={false}
        showClear={true}
    />
} 
