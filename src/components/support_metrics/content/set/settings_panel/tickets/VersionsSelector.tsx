import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeVersions, changeVersionsInclude } from '../../../../store/actions/Tickets'
import { fetchVersions, Version } from '../../../../network_resource_fetcher/tickets/FetchVersions'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { versionsSelector, versionsSelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function VersionsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => versionsSelector(store, setTitle))
    const onValueChange = (allValues: Array<Version>, values: Array<string>) => changeVersions({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeVersionsInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, versionsSelectorName)

    return <MultiOptionSelector<Version, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select versions'
        label='Versions'
        fetchDataSource={fetchVersions}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
} 
