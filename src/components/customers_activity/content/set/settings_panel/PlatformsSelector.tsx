import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MultiOptionSelector, } from '../../../../common/components/MultiOptionSelector'
import { dependenciesAreEmpty } from '../../../../common/components/Utils'
import { CustomersActivityStore } from '../../../store/Store'
import { changePlatforms, changePlatformsInclude } from '../../../store/Actions'
import { getFilterParametersNodeValuesOrDefault } from '../../../store/Utils'
import { fetchPlatforms, Platform } from '../../../network_resource_fetcher/FetchPlatforms'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function PlatformsSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])

    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const tribes = getFilterParametersNodeValuesOrDefault(tribesNode, emptyArray)
    const dataSource = useCascadeDataSource(() => fetchPlatforms(tribes), tribes)

    const state = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.platforms as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<Platform>, values: Array<string>) => changePlatforms({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changePlatformsInclude({ stateId: setTitle, data: include })

    if (dependenciesAreEmpty(dataSource))
        return null
    return <MultiOptionSelector<Platform, string>
        className='CustomersActivity_PlatformSelector'
        displayExpr='platform_name'
        valueExpr='platform_id'
        placeholder='Select platforms'
        label='Platforms'
        dataSource={dataSource}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
