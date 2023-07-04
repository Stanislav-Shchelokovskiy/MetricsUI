import React from 'react'
import { useSelector } from 'react-redux'
import { CostMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeTeams, changeTeamsInclude } from '../../store/sets/Actions'
import { fetchTeams, Team } from '../../network_resource_fetcher/Teams'
import { empTeamsSelector } from '../../store/sets/Selectors'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'

export default function EmpTeamsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: CostMetricsStore) => empTeamsSelector(state, setTitle))
    const onValueChange = (allValues: Array<Team>, values: Array<string>) => changeTeams({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTeamsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Team, string>
        className='CostMetrics_TeamsSelector'
        displayExpr='name'
        valueExpr='name'
        placeholder='Select employees teams'
        label='Teams'
        fetchDataSource={fetchTeams}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
