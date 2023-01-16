import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeComponents, changeComponentsInclude } from '../../../store/Actions'
import { fetchComponents, Component } from '../../../network_resource_fetcher/FetchComponents'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function ComponentsSelector({ setTitle }: { setTitle: string }) {

    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const fetchArgs = [tribesNode]

    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.components as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<Component>, values: Array<string>) => changeComponents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeComponentsInclude({ stateId: setTitle, data: include })


    return <MultiOptionSelector<Component, string>
        className='CustomersActivity_ComponentsSelector'
        displayExpr='component_name'
        valueExpr='component_id'
        placeholder='Select components'
        label='CAT components'
        fetchDataSource={fetchComponents}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={value.values}
        includeButtonState={value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
