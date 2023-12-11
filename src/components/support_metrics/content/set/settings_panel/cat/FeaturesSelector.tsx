import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeFeatures, changeFeaturesInclude } from '../../../../store/actions/CAT'
import { fetchFeatures, Feature } from '../../../../network_resource_fetcher/cat/FetchFeatures'
import { paramOrDefault } from '../../../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { tentsSelector } from '../../../../../common/store/multiset_container/sets/selectors/Common'
import { componentsSelector, featuresSelector, featuresSelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function FeaturesSelector() {
    const setTitle = useSetTitle()
    const tentsNode = useSelector((store: SupportMetricsStore) => tentsSelector(store, setTitle))
    const componentsNode = useSelector((store: SupportMetricsStore) => componentsSelector(store, setTitle))
    const fetchArgs = [paramOrDefault(tentsNode), paramOrDefault(componentsNode)]

    const value = useSelector((store: SupportMetricsStore) => featuresSelector(store, setTitle))
    const onValueChange = (allValues: Array<Feature>, values: Array<string>) => changeFeatures({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeFeaturesInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, featuresSelectorName)

    return <MultiOptionSelector<Feature, string>
        displaySelector='feature_name'
        valueSelector='feature_id'
        placeholder='Select features'
        label='CAT features'
        fetchDataSource={fetchFeatures}
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
