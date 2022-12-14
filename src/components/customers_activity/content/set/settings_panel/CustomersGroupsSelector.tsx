import React from 'react'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore, useCustomersActivitySelector } from '../../../store/Store'
import { changeCustomersGroups, changeCustomersGroupsInclude } from '../../../store/Actions'
import { fetchCustomersGroups, CustomersGroup } from '../../../network_resource_fetcher/FetchCustomersGroups'
import { FilterParametersNode } from '../../../store/SetsReducer'


function CustomersGroupsSelector({ setTitle }: { setTitle: string }) {
    const state = useCustomersActivitySelector((store: CustomersActivityStore) =>
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
        defaultValue={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
        showSelectionControls={true}
    />
}

export default React.memo(CustomersGroupsSelector)
