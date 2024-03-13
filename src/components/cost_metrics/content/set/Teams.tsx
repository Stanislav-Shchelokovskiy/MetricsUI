import React from 'react'
import { useSelector } from 'react-redux'
import { CostMetricsStore } from '../../store/Store'
import { DEFAULT_SET } from '../../store/sets/Defaults'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeTeams, changeTeamsInclude } from '../../store/sets/Actions'
import { fetchTeams } from '../../network_resource_fetcher/Teams'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { Knot } from '../../../common/Typing'
import { empTeamsSelector, empTeamsSelectorName } from '../../store/sets/Selectors'
import { setDecomposition } from '../../../common/store/multiset_container/sets/Defaults'


export default function EmpTeamsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: CostMetricsStore) => empTeamsSelector(state, setTitle))
    const onValueChange = (allValues: Array<Knot>, values: Array<string>) => changeTeams({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTeamsInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, empTeamsSelectorName)
    const defaultValue = DEFAULT_SET.empTeams?.values


    return <MultiOptionSelector<Knot, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select employees teams'
        label='Teams'
        defaultValue={defaultValue}
        fetchDataSource={fetchTeams}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
} 
