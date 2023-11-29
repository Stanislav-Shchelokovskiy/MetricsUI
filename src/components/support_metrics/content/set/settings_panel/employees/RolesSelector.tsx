import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeRoles, changeRolesInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchRoles, Role } from '../../../../network_resource_fetcher/employees/FetchRoles'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { rolesSelector } from '../../../../../common/store/multiset_container/sets/selectors/Employees'


export default function RolesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => rolesSelector(store, setTitle))
    const onValueChange = (allValues: Array<Role>, values: Array<string>) => changeRoles({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeRolesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Role, string>
        className='CustomersActivity_RolesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select employees roles'
        label='Employees roles'
        fetchDataSource={fetchRoles}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
