import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeFeatures, changeFeaturesInclude } from '../../../../store/actions/CAT'
import { fetchFeatures, Feature } from '../../../../network_resource_fetcher/cat/FetchFeatures'
import { paramOrDefault } from '../../../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { tentsSelector, componentsSelector, featuresSelector } from '../../../../store/sets_reducer/Selectors'


export default function FeaturesSelector() {
    const setTitle = useSetTitle()
    const tentsNode = useSelector((store: SupportMetricsStore) => tentsSelector(store, setTitle))
    const componentsNode = useSelector((store: SupportMetricsStore) => componentsSelector(store, setTitle))
    const fetchArgs = [paramOrDefault(tentsNode), paramOrDefault(componentsNode)]

    const value = useSelector((store: SupportMetricsStore) => featuresSelector(store, setTitle))
    const onValueChange = (allValues: Array<Feature>, values: Array<string>) => changeFeatures({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeFeaturesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Feature, string>
        className='CustomersActivity_FeaturesSelector'
        displayExpr='feature_name'
        valueExpr='feature_id'
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
    />
} 
