import React, { useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import OptionSelector from '../../../../../common/components/OptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeCustomersGroups, changeCustomersGroupsInclude } from '../../../../store/actions/Customers'
import { fetchCustomersGroups, CustomersGroup } from '../../../../network_resource_fetcher/customers/FetchCustomersGroups'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { customersGroupsSelector, customersGroupsSelectorName } from '../../../../store/sets/Selectors'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function CustomersGroupsSelector() {
    const setTitle = useSetTitle()
    const baselineAlignedModeEnabled = useSelector((store: SupportMetricsStore) => store.container.baselineAlignedModeEnabled)
    const fetchArgs = useMemo(() => [false], [])

    const value = useSelector((store: SupportMetricsStore) => customersGroupsSelector(store, setTitle))
    const onValueChange = useCallback((allValues: Array<CustomersGroup>, values: Array<string>) => changeCustomersGroups({ stateId: setTitle, data: values }), [setTitle])
    const onIncludeChange = useCallback((include: boolean) => changeCustomersGroupsInclude({ stateId: setTitle, data: include }), [setTitle])

    if (baselineAlignedModeEnabled)
        return null

    const decompositionArgs = setDecomposition(setTitle, customersGroupsSelectorName)

    return <MultiOptionSelector<CustomersGroup, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select user groups'
        label='User groups'
        fetchDataSource={fetchCustomersGroups}
        fetchArgs={fetchArgs}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
}

export function BAMCustomersGroupsSelector() {
    const setTitle = useSetTitle()
    const baselineAlignedModeEnabled = useSelector((store: SupportMetricsStore) => store.container.baselineAlignedModeEnabled)
    const fetchArgs = useMemo(() => [true], [])

    const onValueChange = useCallback((value: string | undefined) => changeCustomersGroups({ stateId: setTitle, data: value === undefined ? [] : [value] }), [])
    const valueSelector = useCallback((store: SupportMetricsStore) => {
        const groups = customersGroupsSelector(store, setTitle)
        return groups?.values.length === 0 ? undefined : groups?.values[0]
    }, [setTitle])

    if (!baselineAlignedModeEnabled)
        return null

    return <OptionSelector<CustomersGroup, string>
        displayExpr='name'
        valueExpr='id'
        placeholder='Select user group'
        label='User group'
        fetchDataSource={fetchCustomersGroups}
        fetchArgs={fetchArgs}
        valueSelector={valueSelector}
        onValueChange={onValueChange}
        container='#Sets_ScrollView_div'
        showClear={true}
        showDropDownButton={false}
    />
}
