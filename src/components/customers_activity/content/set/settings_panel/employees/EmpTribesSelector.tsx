import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeEmpTribes, changeEmpTribesInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmpTribes, EmpTribe } from '../../../../network_resource_fetcher/employees/FetchEmpTribes'


export default function EmpTribesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.empTribes)
    const onValueChange = (allValues: Array<EmpTribe>, values: Array<string>) => changeEmpTribes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmpTribesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<EmpTribe, string>
        className='CustomersActivity_EmpTribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select employees tribes'
        label='Employees tribes'
        fetchDataSource={fetchEmpTribes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
