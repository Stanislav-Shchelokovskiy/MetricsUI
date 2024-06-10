import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeConversionsTypes, changeConversionsTypesInclude } from '../../../../store/actions/Customers'
import { fetchConversionStatuses, ConversionStatus } from '../../../../network_resource_fetcher/customers/FetchConversionStatuses'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { customersTypesSelector, conversionsTypesSelector, conversionsTypesSelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function CustomersConversionsTypesSelector() {
    const setTitle = useSetTitle()
    const customersTypeNode = useSelector((store: SupportMetricsStore) => customersTypesSelector(store, setTitle))
    const fetchArgs = [customersTypeNode]

    const value = useSelector((store: SupportMetricsStore) => conversionsTypesSelector(store, setTitle))
    const onValueChange = (allValues: Array<ConversionStatus>, values: Array<number>) => changeConversionsTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeConversionsTypesInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, conversionsTypesSelectorName)

    return <MultiOptionSelector<ConversionStatus, number>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select conversion types'
        label='User conversion types'
        fetchDataSource={fetchConversionStatuses}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        decompositionArgs={decompositionArgs}
    />
}
