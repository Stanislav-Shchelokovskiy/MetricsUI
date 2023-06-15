import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeEmpTribes, changeEmpTribesInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmpTribes, EmpTribe } from '../../../../network_resource_fetcher/employees/FetchEmpTribes'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { empTribesSelector } from '../../../../store/sets/Selectors'


export default function EmpTribesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => empTribesSelector(store, setTitle))
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
