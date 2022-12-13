import React, { useMemo } from 'react'
import { MultiOptionSelector } from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeFeatures, changeFeaturesInclude } from '../../../store/Actions'
import { fetchFeatures, Feature } from '../../../network_resource_fetcher/FetchFeatures'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function FeaturesSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])

    const tribesNode = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const tribes = tribesNode?.values || emptyArray
    const componentsNode = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.components)
    const components = componentsNode?.values || emptyArray
    const dataSource = useCascadeDataSource(() => fetchFeatures(tribes, components), tribes, components)

    const state = useAppSelector((store: AppStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.features as FilterParametersNode<string>
    )
    const onValueChange = (allValues: Array<Feature>, values: Array<string>) => changeFeatures({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeFeaturesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Feature, string>
        className='CustomersActivity_ControlsSelector'
        displayExpr='feature_name'
        valueExpr='feature_id'
        placeholder='Select features'
        label='CAT features'
        disabled={tribes.length === 0 || components.length === 0}
        dataSource={dataSource}
        defaultValue={state?.values}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange} />
} 
