import React from 'react'
import { useSelector } from 'react-redux'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeSeverity, changeSeverityInclude } from '../../../../store/actions/Bugs'
import { fetchSeverityValues, Severity } from '../../../../network_resource_fetcher/bugs/FetchSeverityValues'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import BugsSelectorWrapper from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { severitySelector, severitySelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function SeveritySelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => severitySelector(store, setTitle))
    const onValueChange = (allValues: Array<Severity>, values: Array<string>) => changeSeverity({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeSeverityInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, severitySelectorName)

    return <BugsSelectorWrapper
        Wrapped={MultiOptionSelector}
        setTitle={setTitle}
        displaySelector='name'
        valueSelector='id'
        placeholder='Select severity values'
        label='Severity'
        fetchDataSource={fetchSeverityValues}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        decompositionArgs={decompositionArgs}
    />
} 
