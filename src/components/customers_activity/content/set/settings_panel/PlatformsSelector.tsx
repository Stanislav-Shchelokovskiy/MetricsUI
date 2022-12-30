import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changePlatforms, changePlatformsInclude } from '../../../store/Actions'
import { fetchPlatforms, Platform } from '../../../network_resource_fetcher/FetchPlatforms'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function PlatformsSelector({ setTitle }: { setTitle: string }) {
    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const fetchArgs = [tribesNode]

    const state = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.platforms as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<Platform>, values: Array<string>) => changePlatforms({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changePlatformsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Platform, string>
        className='CustomersActivity_PlatformSelector'
        displayExpr='platform_name'
        valueExpr='platform_id'
        placeholder='Select platforms'
        label='Platforms'
        fetchDataSource={fetchPlatforms}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
