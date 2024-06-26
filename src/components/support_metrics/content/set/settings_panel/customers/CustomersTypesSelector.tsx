import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeCustomersTypes, changeCustomersTypesInclude } from '../../../../store/actions/Customers'
import { fetchLicenseStatuses, LicenseStatus } from '../../../../network_resource_fetcher/customers/FetchLicenseStatuses'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { customersTypesSelector, customersTypesSelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function CustomersTypesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => customersTypesSelector(store, setTitle))
    const onValueChange = (allValues: Array<LicenseStatus>, values: Array<number>) => changeCustomersTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersTypesInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, customersTypesSelectorName)

    return <MultiOptionSelector<LicenseStatus, number>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select user types'
        label='User types'
        fetchDataSource={fetchLicenseStatuses}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        decompositionArgs={decompositionArgs}
    />
} 
