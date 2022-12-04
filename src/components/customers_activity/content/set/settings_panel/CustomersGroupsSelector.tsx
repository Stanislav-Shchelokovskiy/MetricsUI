import React, { useRef } from 'react'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { AppStore } from '../../../../common/AppStore'
import { changeCustomersGroups } from '../../../store/Actions'
import { fetchCustomersGroups, CustomersGroup } from '../../../network_resource_fetcher/FetchCustomersGroups'
import useDataSource from '../../../../common/hooks/UseDataSource'
import useMultiSelectValueDispatch from '../../../../common/hooks/UseMultiSelectValueDispatch'
import useSelectedValues from '../../../../common/hooks/UseSelectedValues'


function CustomersGroupsSelector({ setTitle }: { setTitle: string }) {
    const renderCount = useRef(0)
    console.log('CustomersGroupsSelector render: ', renderCount.current++)

    const groups = useDataSource<CustomersGroup>(fetchCustomersGroups)

    const selectedGroups = useSelectedValues<CustomersGroup, string>(
        (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.customersGroups || [],
        (value: CustomersGroup) => value.id)

    const onGroupSelect = useMultiSelectValueDispatch<CustomersGroup, string>(
        setTitle,
        changeCustomersGroups,
        groups,
        (value: CustomersGroup, targetValue: string) => value.id === targetValue)

    return <MultiOptionSelector<CustomersGroup, string>
        className='CustomersActivity_CustomersGroupsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user groups'
        label='User groups'
        dataSource={groups}
        selectedValues={selectedGroups}
        onValueChange={onGroupSelect} />
}

export default React.memo(CustomersGroupsSelector)
