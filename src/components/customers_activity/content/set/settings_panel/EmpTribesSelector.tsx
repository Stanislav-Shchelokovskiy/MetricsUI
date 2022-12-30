import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeEmpTribes, changeEmpTribesInclude } from '../../../store/Actions'
import { fetchEmpTribes, EmpTribe } from '../../../network_resource_fetcher/FetchEmpTribes'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function EmpTribesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.empTribes as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<EmpTribe>, values: Array<string>) => changeEmpTribes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmpTribesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<EmpTribe, string>
        className='CustomersActivity_EmpTribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select employees tribes'
        label='Employees tribes'
        fetchDataSource={fetchEmpTribes}
        value={value.values}
        includeButtonState={value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
