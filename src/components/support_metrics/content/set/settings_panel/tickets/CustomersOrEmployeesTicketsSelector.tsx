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
    const ds = useMemo(() => [{ id: 0, name: "Customers' tickets only" }, { id: 1, name: "Employees' tickets only" }], [])
    const valueSelector = (store: SupportMetricsStore) => employesTicketsSelector(store, setTitle)?.value
    const onValueChange = (value: number | undefined) => changeEmployeeTickets({ stateId: setTitle, data: value === null ? undefined : value })

    return <OptionSelector<Privacy, number | undefined>
        className='CustomersActivity_CustomersOrEmployeesTicketsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder="Customers' and employees' tickets"
        dataSource={ds}
        valueSelector={valueSelector}
        onValueChange={onValueChange}
        label=''
        showDropDownButton={false}
        showClear={true}
    />
} 
