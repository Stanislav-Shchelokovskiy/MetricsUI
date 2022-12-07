import React, { useMemo } from 'react'
import { MultiOptionSelector, } from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeControls, changeControlsInclude } from '../../../store/Actions'
import { fetchControls, Control } from '../../../network_resource_fetcher/FetchControls'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function ControlsSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])

    const tribesNode = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const tribes = tribesNode?.values || emptyArray
    const dataSource = useCascadeDataSource(() => fetchControls(tribes), tribes)

    const state = useAppSelector((store: AppStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.controls as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<Control>, values: Array<string>) => changeControls({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeControlsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Control, string>
        className='CustomersActivity_ControlsSelector'
        displayExpr='control_name'
        valueExpr='control_id'
        placeholder='Select controls'
        label='CAT controls'
        disabled={tribes.length === 0}
        dataSource={dataSource}
        defaultValue={state.values}
        includeButtonState={state.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange} />
} 
