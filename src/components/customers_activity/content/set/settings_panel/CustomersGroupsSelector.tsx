import React, { useRef } from 'react'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { AppStore } from '../../../../common/AppStore'
import { changeCustomersGroups } from '../../../store/Actions'
import { fetchCustomersGroups, CustomersGroup } from '../../../network_resource_fetcher/FetchCustomersGroups'


function CustomersGroupsSelector({ setTitle }: { setTitle: string }) {
    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.customersGroups || []
    const onValueChange = (allValues: Array<CustomersGroup>, values: Array<string>) => changeCustomersGroups({ stateId: setTitle, data: values })

    return <MultiOptionSelector<CustomersGroup, string>
        className='CustomersActivity_CustomersGroupsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user groups'
        label='User groups'
        fetchDataSourceValues={fetchCustomersGroups}
        stateSelector={stateSelector}
        onValueChange={onValueChange} />
}

export default React.memo(CustomersGroupsSelector)
