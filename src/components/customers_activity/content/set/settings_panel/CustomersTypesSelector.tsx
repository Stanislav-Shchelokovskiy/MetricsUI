import React from 'react'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore, useCustomersActivitySelector } from '../../../store/Store'
import { changeCustomersTypes, changeCustomersTypesInclude, applyCustomersTypesState } from '../../../store/Actions'
import { fetchgetLicenseStatuses, LicenseStatus } from '../../../network_resource_fetcher/FetchgetLicenseStatuses'
import { FilterParametersNode } from '../../../store/SetsReducer'
import { getDefaultFilterParametersNode } from '../../../store/SetsReducer'
import { useDispatch } from 'react-redux'


export default function CustomersTypesSelector({ setTitle }: { setTitle: string }) {
    const state = useCustomersActivitySelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.customersTypes as FilterParametersNode<number>
    )
    const dispatch = useDispatch()
    if (state === undefined) {
        dispatch(applyCustomersTypesState({ stateId: setTitle, data: getDefaultFilterParametersNode<number>() }))
    }

    const onValueChange = (allValues: Array<LicenseStatus>, values: Array<number>) => changeCustomersTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeCustomersTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelectorWithFetch<LicenseStatus, number>
        className='CustomersActivity_CustomersTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user types'
        label='User types'
        fetchDataSourceValues={fetchgetLicenseStatuses}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
