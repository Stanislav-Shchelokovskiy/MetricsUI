import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changePlatforms, changePlatformsInclude } from '../../../../store/actions/PlatformsProducts'
import { fetchPlatforms, Platform } from '../../../../network_resource_fetcher/platforms_products/FetchPlatforms'
import { paramOrDefault } from '../../../../store/Utils'


export default function PlatformsSelector({ setTitle }: { setTitle: string }) {
    const tentsNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tents)
    const fetchArgs = [paramOrDefault(tentsNode)]

    const value = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.platforms)
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
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
        showNullItem={true}
    />
} 
