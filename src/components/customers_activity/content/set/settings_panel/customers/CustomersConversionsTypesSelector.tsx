import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeConversionsTypes, changeConversionsTypesInclude } from '../../../../store/actions/Customers'
import { fetchConversionStatuses, ConversionStatus } from '../../../../network_resource_fetcher/FetchConversionStatuses'


export default function CustomersConversionsTypesSelector({ setTitle }: { setTitle: string }) {
    const customersTypeNode = useSelector((store: CustomersActivityStore) =>store.customersActivitySets.find(x => x.title === setTitle)?.customersTypes)
    const fetchArgs = [customersTypeNode]

    const value = useSelector((store: CustomersActivityStore) =>store.customersActivitySets.find(x => x.title === setTitle)?.conversionsTypes)
    const onValueChange = (allValues: Array<ConversionStatus>, values: Array<number>) => changeConversionsTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeConversionsTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<ConversionStatus, number>
        className='CustomersActivity_ConversionsTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select conversion types'
        label='User conversion types'
        fetchDataSource={fetchConversionStatuses}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}