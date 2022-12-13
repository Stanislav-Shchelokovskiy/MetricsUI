import React, { useMemo } from 'react'
import { MultiOptionSelector, } from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeComponents, changeComponentsInclude } from '../../../store/Actions'
import { fetchComponents, Component } from '../../../network_resource_fetcher/FetchComponents'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function ComponentsSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])

    const tribesNode = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const tribes = tribesNode?.values || emptyArray
    const dataSource = useCascadeDataSource(() => fetchComponents(tribes), tribes)

    const state = useAppSelector((store: AppStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.components as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<Component>, values: Array<string>) => changeComponents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeComponentsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Component, string>
        className='CustomersActivity_ControlsSelector'
        displayExpr='component_name'
        valueExpr='component_id'
        placeholder='Select components'
        label='CAT components'
        disabled={tribes.length === 0}
        dataSource={dataSource}
        defaultValue={state?.values}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange} />
} 
