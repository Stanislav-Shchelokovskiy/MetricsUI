import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeFeatures, changeFeaturesInclude } from '../../../../store/actions/CAT'
import { fetchFeatures, Feature } from '../../../../network_resource_fetcher/cat/FetchFeatures'
import { paramOrDefault } from '../../../../../common/store/multiset_container/Utils'


export default function FeaturesSelector({ setTitle }: { setTitle: string }) {
    const tentsNode = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.tents)
    const componentsNode = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.components)
    const fetchArgs = [paramOrDefault(tentsNode), paramOrDefault(componentsNode)]

    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.features)
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
