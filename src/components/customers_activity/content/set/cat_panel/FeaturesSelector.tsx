import React, { useMemo } from 'react'
import { MultiOptionSelector } from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeFeatures } from '../../../store/Actions'
import { fetchFeatures, Feature } from '../../../network_resource_fetcher/FetchFeatures'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'


export default function FeaturesSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])

    const tribes = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes || emptyArray)
    const controls = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.controls || emptyArray)
    const dataSource = useCascadeDataSource(() => fetchFeatures(tribes, controls), tribes, controls)

    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.features || emptyArray

    const onValueChange = (allValues: Array<Feature>, values: Array<string>) => changeFeatures({ stateId: setTitle, data: values })

    return <MultiOptionSelector<Feature, string>
        className='CustomersActivity_ControlsSelector'
        displayExpr='feature_name'
        valueExpr='feature_id'
        placeholder='Select features'
        label='CAT features'
        disabled={tribes.length === 0 || controls.length === 0}
        dataSource={dataSource}
        stateSelector={stateSelector}
        onValueChange={onValueChange} />
} 
