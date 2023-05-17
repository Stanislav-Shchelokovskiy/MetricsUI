import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import OptionSelector from '../../../../../common/components/OptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeCustomersGroups, changeCustomersGroupsInclude } from '../../../../store/actions/Customers'
import { fetchCustomersGroups, CustomersGroup } from '../../../../network_resource_fetcher/customers/FetchCustomersGroups'


export default function CustomersGroupsSelector({ setTitle }: { setTitle: string }) {
    const baselineAlignedModeEnabled = useSelector((store: CustomersActivityStore) => store.customersActivity.baselineAlignedModeEnabled)
    const fetchArgs = [baselineAlignedModeEnabled]

    if (baselineAlignedModeEnabled) {
        return <BAMCustomersGroupsSelector
            setTitle={setTitle}
            fetchArgs={fetchArgs}
        />
    }

    return <RegularCustomersGroupsSelector
        setTitle={setTitle}
        fetchArgs={fetchArgs}
    />
}

function RegularCustomersGroupsSelector({ setTitle, fetchArgs }: { setTitle: string, fetchArgs: any }) {
    const value = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.customersGroups)
    const onValueChange = (allValues: Array<CustomersGroup>, values: Array<string>) => changeCustomersGroups({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersGroupsInclude({ stateId: setTitle, data: include })
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
        showNullItem={true}
    />
}

function BAMCustomersGroupsSelector({ setTitle, fetchArgs }: { setTitle: string, fetchArgs: any }) {
    const onValueChange = (value: string | undefined) => changeCustomersGroups({ stateId: setTitle, data: value === undefined ? [] : [value] })
    const valueSelector = (store: CustomersActivityStore) => {
        const groups = store.customersActivitySets.find(x => x.title === setTitle)?.customersGroups
        return groups?.values.length === 0 ? undefined : groups?.values[0]
    }

    return <OptionSelector<CustomersGroup, string>
        className='CustomersActivity_CustomersGroupsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user group'
        label='User group'
        fetchDataSource={fetchCustomersGroups}
        fetchArgs={fetchArgs}
        valueSelector={valueSelector}
        onValueChange={onValueChange}
        container='#CustomersActivity_Sets_ScrollView_div'
        showClear={true}
        showDropDownButton={false}
    />
}
