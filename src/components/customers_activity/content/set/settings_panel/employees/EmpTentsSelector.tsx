import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeEmpTents, changeEmpTentsInclude } from '../../../../store/actions/Employees'
import { fetchEmpTents, EmpTent } from '../../../../network_resource_fetcher/employees/FetchEmptTents'


export default function EmpTentsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>store.customersActivitySets.find(x => x.title === setTitle)?.empTents)
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
        container='#CustomersActivity_Sets_ScrollView_div'
        showNullItem={true}
    />
} 
