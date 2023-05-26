import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeEmpTents, changeEmpTentsInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmpTents, EmpTent } from '../../../../network_resource_fetcher/employees/FetchEmptTents'


export default function EmpTentsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.empTents)
    const onValueChange = (allValues: Array<EmpTent>, values: Array<string>) => changeEmpTents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmpTentsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<EmpTent, string>
        className='CustomersActivity_EmpTentsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select employees tents'
        label='Employees tents'
        fetchDataSource={fetchEmpTents}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
