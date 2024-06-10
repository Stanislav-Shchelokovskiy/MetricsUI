import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeEmpTents, changeEmpTentsInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmpTents, EmpTent } from '../../../../network_resource_fetcher/employees/FetchEmptTents'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { empTentsSelector, empTentsSelectorName } from '../../../../../common/store/multiset_container/sets/selectors/Employees'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function EmpTentsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => empTentsSelector(store, setTitle))
    const onValueChange = (allValues: Array<EmpTent>, values: Array<string>) => changeEmpTents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmpTentsInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, empTentsSelectorName)

    return <MultiOptionSelector<EmpTent, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select employees tents'
        label='Employees tents'
        fetchDataSource={fetchEmpTents}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
} 
