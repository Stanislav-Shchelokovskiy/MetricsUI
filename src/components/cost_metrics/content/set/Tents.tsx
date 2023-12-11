import React from 'react'
import { useSelector } from 'react-redux'
import { CostMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeEmpTents, changeEmpTentsInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { fetchTents } from '../../network_resource_fetcher/Tents'
import { empTentsSelector, empTentsSelectorName } from '../../../common/store/multiset_container/sets/selectors/Employees'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { Knot } from '../../../common/Typing'
import { setDecomposition } from '../../../common/store/multiset_container/sets/Defaults'


export default function EmpTentsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: CostMetricsStore) => empTentsSelector(state, setTitle))
    const onValueChange = (allValues: Array<Knot>, values: Array<string>) => changeEmpTents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmpTentsInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, empTentsSelectorName)

    return <MultiOptionSelector<Knot, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select employees tents'
        label='Tents'
        fetchDataSource={fetchTents}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
} 
