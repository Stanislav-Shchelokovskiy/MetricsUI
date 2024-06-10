import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeRoles, changeRolesInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchRoles, Role } from '../../../../network_resource_fetcher/employees/FetchRoles'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { rolesSelector, rolesSelectorName } from '../../../../../common/store/multiset_container/sets/selectors/Employees'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function RolesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => rolesSelector(store, setTitle))
    const onValueChange = (allValues: Array<Role>, values: Array<string>) => changeRoles({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeRolesInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, rolesSelectorName)

    return <MultiOptionSelector<Role, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select employees roles'
        label='Employees roles'
        fetchDataSource={fetchRoles}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
} 
