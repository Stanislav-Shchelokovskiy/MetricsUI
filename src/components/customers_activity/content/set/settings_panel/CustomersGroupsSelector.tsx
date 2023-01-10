import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeCustomersGroups, changeCustomersGroupsInclude } from '../../../store/Actions'
import { fetchCustomersGroups, CustomersGroup } from '../../../network_resource_fetcher/FetchCustomersGroups'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function CustomersGroupsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.customersGroups as FilterParametersNode<string>
    )
    const onValueChange = (allValues: Array<CustomersGroup>, values: Array<string>) => changeCustomersGroups({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersGroupsInclude({ stateId: setTitle, data: include })

    const trackedCustomersGroupsModeEnabled = useSelector((store: CustomersActivityStore) => store.customersActivity.trackedCustomersGroupsModeEnabled)
    const fetchArgs = [trackedCustomersGroupsModeEnabled]

    return <MultiOptionSelector<CustomersGroup, string>
        className='CustomersActivity_CustomersGroupsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user groups'
        label='User groups'
        fetchDataSource={fetchCustomersGroups}
        fetchArgs={fetchArgs}
        value={value.values}
        includeButtonState={value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}
