import React, { useMemo } from 'react'
import { MultiOptionSelector } from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeControls } from '../../../store/Actions'
import { fetchControls, Control } from '../../../network_resource_fetcher/FetchControls'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'


export default function ControlsSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])
    const tribes = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes || emptyArray)
    const dataSource = useCascadeDataSource(() => fetchControls(tribes), tribes)

    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.controls || emptyArray
    const onValueChange = (allValues: Array<Control>, values: Array<string>) => changeControls({ stateId: setTitle, data: values })

    return <MultiOptionSelector<Control, string>
        className='CustomersActivity_ControlsSelector'
        displayExpr='control_name'
        valueExpr='control_id'
        placeholder='Select controls'
        label='CAT controls'
        disabled={tribes.length === 0}
        dataSource={dataSource}
        stateSelector={stateSelector}
        onValueChange={onValueChange} />
} 
