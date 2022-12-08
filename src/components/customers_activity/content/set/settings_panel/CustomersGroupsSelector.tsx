import React from 'react'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeCustomersGroups, changeCustomersGroupsInclude } from '../../../store/Actions'
import { fetchCustomersGroups, CustomersGroup } from '../../../network_resource_fetcher/FetchCustomersGroups'
import { FilterParametersNode } from '../../../store/SetsReducer'


function CustomersGroupsSelector({ setTitle }: { setTitle: string }) {
    const state = useAppSelector((store: AppStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.customersGroups as FilterParametersNode<string>
    )
    const onValueChange = (allValues: Array<CustomersGroup>, values: Array<string>) => changeCustomersGroups({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersGroupsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelectorWithFetch<CustomersGroup, string>
        className='CustomersActivity_CustomersGroupsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user groups'
        label='User groups'
        fetchDataSourceValues={fetchCustomersGroups}
        defaultValue={state.values}
        includeButtonState={state.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange} />
}

export default React.memo(CustomersGroupsSelector)
