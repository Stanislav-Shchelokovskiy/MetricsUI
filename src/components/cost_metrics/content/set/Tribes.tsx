import React from 'react'
import { useSelector } from 'react-redux'
import { CostMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeEmpTribes, changeEmpTribesInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { fetchTribes } from '../../network_resource_fetcher/Tribes'
import { empTribesSelector, empTribesSelectorName } from '../../../common/store/multiset_container/sets/selectors/Employees'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { Knot } from '../../../common/Typing'
import { setDecomposition } from '../../../common/store/multiset_container/sets/Defaults'


export default function EmpTribesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: CostMetricsStore) => empTribesSelector(state, setTitle))
    const onValueChange = (allValues: Array<Knot>, values: Array<string>) => changeEmpTribes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmpTribesInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, empTribesSelectorName)

    return <MultiOptionSelector<Knot, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select employees tribes'
        label='Tribes'
        fetchDataSource={fetchTribes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
} 
