import React from 'react'
import { useSelector } from 'react-redux'
import { SearchMultioptionSelector } from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeCustomers, changeCustomersInclude } from '../../../../store/actions/Customers'
import { fetchCustomers, Customer, fetchValidateCustomers } from '../../../../network_resource_fetcher/customers/FetchCustomers'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { customersSelector } from '../../../../store/sets/Selectors'


export default function CustomersSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => customersSelector(store, setTitle))
    const onValueChange = (allValues: Array<Customer>, values: Array<string>) => changeCustomers({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersInclude({ stateId: setTitle, data: include })

    return <SearchMultioptionSelector<Customer, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Search by friendly id'
        label='Customers'
        fetchDataSource={fetchCustomers}
        fetchValidValues={fetchValidateCustomers}
        fetchValidValuesArgs={[value?.values]}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        showSelectionControls={false}
        applyValueMode='instantly'
        container='#Sets_ScrollView_div'
    />
}
