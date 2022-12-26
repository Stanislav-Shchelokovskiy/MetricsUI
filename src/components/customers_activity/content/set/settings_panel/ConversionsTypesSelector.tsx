import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MultiOptionSelector } from '../../../../common/components/MultiOptionSelector'
import { dependenciesAreEmpty } from '../../../../common/components/Utils'
import { CustomersActivityStore } from '../../../store/Store'
import { changeConversionsTypes, changeConversionsTypesInclude } from '../../../store/Actions'
import { getFilterParametersNodeValuesOrDefault } from '../../../store/Utils'
import { fetchConversionStatuses, ConversionStatus } from '../../../network_resource_fetcher/FetchConversionStatuses'
import { FilterParametersNode } from '../../../store/SetsReducer'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'


export default function ConversionsTypesSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])

    const customersTypeNode = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.customersTypes
    )
    const customersTypes = getFilterParametersNodeValuesOrDefault(customersTypeNode, emptyArray)
    const dataSource = useCascadeDataSource(() => fetchConversionStatuses(customersTypes), customersTypes)

    const state = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.conversionsTypes as FilterParametersNode<number>
    )

    const onValueChange = (allValues: Array<ConversionStatus>, values: Array<number>) => changeConversionsTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeConversionsTypesInclude({ stateId: setTitle, data: include })

    if (dependenciesAreEmpty(dataSource))
        return null
    return <MultiOptionSelector<ConversionStatus, number>
        className='CustomersActivity_ConversionsTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select conversion types'
        label='User conversion types'
        dataSource={dataSource}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}
