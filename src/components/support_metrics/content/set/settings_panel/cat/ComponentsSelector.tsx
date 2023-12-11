import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeComponents, changeComponentsInclude } from '../../../../store/actions/CAT'
import { fetchComponents, Component } from '../../../../network_resource_fetcher/cat/FetchComponents'
import { paramOrDefault } from '../../../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { componentsSelector, componentsSelectorName } from '../../../../store/sets/Selectors'
import { tentsSelector } from '../../../../../common/store/multiset_container/sets/selectors/Common'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function ComponentsSelector() {
    const setTitle = useSetTitle()
    const tentsNode = useSelector((store: SupportMetricsStore) => tentsSelector(store, setTitle))
    const fetchArgs = [paramOrDefault(tentsNode)]

    const value = useSelector((store: SupportMetricsStore) => componentsSelector(store, setTitle))
    const onValueChange = (allValues: Array<Component>, values: Array<string>) => changeComponents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeComponentsInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, componentsSelectorName)

    return <MultiOptionSelector<Component, string>
        displaySelector='component_name'
        valueSelector='component_id'
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
        decompositionArgs={decompositionArgs}
    />
} 
