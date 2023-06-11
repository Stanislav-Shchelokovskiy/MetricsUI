import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeComponents, changeComponentsInclude } from '../../../../store/actions/CAT'
import { fetchComponents, Component } from '../../../../network_resource_fetcher/cat/FetchComponents'
import { paramOrDefault } from '../../../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'

export default function ComponentsSelector() {
    const setTitle = useSetTitle()
    const tentsNode = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.tents)
    const fetchArgs = [paramOrDefault(tentsNode)]
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.components)

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
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
