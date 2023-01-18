import React from 'react'
import { useSelector } from 'react-redux'
import { SearchMultioptionSelector } from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeCustomers, changeCustomersInclude } from '../../../store/Actions'
import { fetchCustomers, Customer, fetchValidateCustomers } from '../../../network_resource_fetcher/FetchCustomers'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function CustomersSelector({ setTitle }: { setTitle: string }) {
    const customers = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.customers as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<Customer>, values: Array<string>) => changeCustomers({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersInclude({ stateId: setTitle, data: include })

    return <SearchMultioptionSelector<Customer, string>
        className='CustomersActivity_CustomersSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Search by friendly id'
        label='Customers'
        fetchDataSource={fetchCustomers}
        fetchValidValues={fetchValidateCustomers}
        fetchValidValuesArgs={[customers.values]}
        value={customers.values}
        includeButtonState={customers.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        showSelectionControls={false}
        applyValueMode='instantly'
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}
