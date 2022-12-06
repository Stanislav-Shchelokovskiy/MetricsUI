import React from 'react'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeControls } from '../../../store/Actions'
import { fetchControls, Control } from '../../../network_resource_fetcher/FetchControls'


export default function ControlsSelector({ setTitle }: { setTitle: string }) {
    const tribes = useAppSelector((store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.tribes || [])
    const fetchControlsWrapper = () => fetchControls(tribes)

    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.controls || []
    const onValueChange = (allValues: Array<Control>, values: Array<string>) => changeControls({ stateId: setTitle, data: values })


    return <MultiOptionSelectorWithFetch<Control, string>
        className='CustomersActivity_ControlsSelector'
        displayExpr='control_name'
        valueExpr='control_id'
        placeholder='Select controls'
        label='CAT controls'
        fetchDataSourceValues={fetchControlsWrapper}
        stateSelector={stateSelector}
        onValueChange={onValueChange} />
} 
