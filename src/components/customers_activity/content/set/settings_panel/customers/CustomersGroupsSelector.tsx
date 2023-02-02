import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeCustomersGroups, changeCustomersGroupsInclude } from '../../../../store/actions/Customers'
import { fetchCustomersGroups, CustomersGroup } from '../../../../network_resource_fetcher/FetchCustomersGroups'


export default function CustomersGroupsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>store.customersActivitySets.find(x => x.title === setTitle)?.customersGroups)
    const onValueChange = (allValues: Array<CustomersGroup>, values: Array<string>) => changeCustomersGroups({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersGroupsInclude({ stateId: setTitle, data: include })

    const baselineAlignedModeEnabled = useSelector((store: CustomersActivityStore) => store.customersActivity.baselineAlignedModeEnabled)
    const fetchArgs = [baselineAlignedModeEnabled]

    return <MultiOptionSelector<CustomersGroup, string>
        className='CustomersActivity_CustomersGroupsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user groups'
        label='User groups'
        fetchDataSource={fetchCustomersGroups}
        fetchArgs={fetchArgs}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}