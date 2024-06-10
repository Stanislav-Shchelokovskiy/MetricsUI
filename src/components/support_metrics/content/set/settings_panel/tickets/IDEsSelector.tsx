import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeIDEs, changeIDEsInclude } from '../../../../store/actions/Tickets'
import { fetchIDEs, IDE } from '../../../../network_resource_fetcher/tickets/FetchIDEs'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { idesSelector, idesSelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function IDEsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => idesSelector(store, setTitle))
    const onValueChange = (allValues: Array<IDE>, values: Array<string>) => changeIDEs({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeIDEsInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, idesSelectorName)

    return <MultiOptionSelector<IDE, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select IDEs'
        label='IDE'
        fetchDataSource={fetchIDEs}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
} 
