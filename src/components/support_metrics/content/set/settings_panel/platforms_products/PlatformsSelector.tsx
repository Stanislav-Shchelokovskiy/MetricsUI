import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changePlatforms, changePlatformsInclude } from '../../../../store/actions/PlatformsProducts'
import { fetchPlatforms, Platform } from '../../../../network_resource_fetcher/platforms_products/FetchPlatforms'
import { paramOrDefault } from '../../../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { tentsSelector, platformsSelector } from '../../../../store/sets_reducer/Selectors'


export default function PlatformsSelector() {
    const setTitle = useSetTitle()
    const tentsNode = useSelector((store: SupportMetricsStore) => tentsSelector(store, setTitle))
    const fetchArgs = [paramOrDefault(tentsNode)]

    const value = useSelector((store: SupportMetricsStore) => platformsSelector(store, setTitle))
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
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
