import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeEmpTents, changeEmpTentsInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmpTents, EmpTent } from '../../../../network_resource_fetcher/employees/FetchEmptTents'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { empTentsSelector } from '../../../../../common/store/multiset_container/sets/selectors/Employees'


export default function EmpTentsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => empTentsSelector(store, setTitle))
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
