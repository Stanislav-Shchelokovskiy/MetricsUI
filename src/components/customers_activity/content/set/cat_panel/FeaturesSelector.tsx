import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeFeatures, changeFeaturesInclude } from '../../../store/Actions'
import { getFilterParametersNodeValuesOrDefault } from '../../../store/Utils'
import { fetchFeatures, Feature } from '../../../network_resource_fetcher/FetchFeatures'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function FeaturesSelector({ setTitle }: { setTitle: string }) {
    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const componentsNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.components)
    const emptyArray = useMemo(() => [], [])
    const tribes = getFilterParametersNodeValuesOrDefault(tribesNode, emptyArray)
    const components = getFilterParametersNodeValuesOrDefault(componentsNode, emptyArray)
    const fetchArgs = useMemo(() => [tribes, components], [tribes, components])

    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.features as FilterParametersNode<string>
    )
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
        value={value.values}
        includeButtonState={value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
