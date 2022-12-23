import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MultiOptionSelector } from '../../../../common/components/MultiOptionSelector'
import { dependenciesAreEmpty } from '../../../../common/components/Utils'
import { CustomersActivityStore } from '../../../store/Store'
import { changeFeatures, changeFeaturesInclude } from '../../../store/Actions'
import { getFilterParametersNodeValuesOrDefault } from '../../../store/Utils'
import { fetchFeatures, Feature } from '../../../network_resource_fetcher/FetchFeatures'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function FeaturesSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])

    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const tribes = getFilterParametersNodeValuesOrDefault(tribesNode, emptyArray)
    const componentsNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.components)
    const components =  getFilterParametersNodeValuesOrDefault(componentsNode, emptyArray)
    const dataSource = useCascadeDataSource(() => fetchFeatures(tribes, components), tribes, components)

    const state = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.features as FilterParametersNode<string>
    )
    const onValueChange = (allValues: Array<Feature>, values: Array<string>) => changeFeatures({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeFeaturesInclude({ stateId: setTitle, data: include })

    if (dependenciesAreEmpty(dataSource))
        return null
    return <MultiOptionSelector<Feature, string>
        className='CustomersActivity_FeaturesSelector'
        displayExpr='feature_name'
        valueExpr='feature_id'
        placeholder='Select features'
        label='CAT features'
        dataSource={dataSource}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
