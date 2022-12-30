import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeCustomersTypes, changeCustomersTypesInclude } from '../../../store/Actions'
import { fetchLicenseStatuses, LicenseStatus } from '../../../network_resource_fetcher/FetchLicenseStatuses'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function CustomersTypesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.customersTypes as FilterParametersNode<number>
    )

    const onValueChange = (allValues: Array<LicenseStatus>, values: Array<number>) => changeCustomersTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<LicenseStatus, number>
        className='CustomersActivity_CustomersTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user types'
        label='User types'
        fetchDataSource={fetchLicenseStatuses}
        value={value.values}
        includeButtonState={value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
