import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeCustomers, changeCustomersInclude } from '../../../store/Actions'
import { fetchCustomers, Customer } from '../../../network_resource_fetcher/FetchCustomers'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function CustomersSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.customers as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<Customer>, values: Array<string>) => changeCustomers({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersInclude({ stateId: setTitle, data: include })


    return <MultiOptionSelector<Customer, string>
        className='CustomersActivity_CustomersSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select customers'
        label='Customers'
        fetchDataSource={fetchCustomers}
        hideIfDataSourceEmpty={true}
        value={value.values}
        includeButtonState={value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}
