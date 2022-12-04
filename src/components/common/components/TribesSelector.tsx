import React, { useRef } from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import { Tribe } from '../Interfaces'
import { AppStore } from '../AppStore'
import { fetchTribes } from '../network_resource_fetcher/FetchAvailableTribes'
import MultiOptionSelector from './MultiOptionSelector'


export default function TribesSelector(
    {
        stateSelector,
        changeSelectedTribesAction
    }:
        {
            stateSelector: (store: AppStore) => Array<Tribe>,
            changeSelectedTribesAction: (selectedTribes: Array<Tribe>) => PayloadAction<any>
        }
) {
    // const renderCount = useRef(0)
    // console.log(' TribesSelector render ', renderCount.current++)

    const dataSourceObjectKeySelector = (value: Tribe) => value.id
    const dataSourceObjectByKeySelector = (value: Tribe, targetKeyValue: string) => value.id === targetKeyValue
    const onValueChange = (values: Array<Tribe>) => changeSelectedTribesAction(values)

    return <MultiOptionSelector<Tribe, string>
        className='TribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tribes to display...'
        label='Tribes'
        fetchDataSourceValues={fetchTribes}
        stateSelector={stateSelector}
        dataSourceObjectKeySelector={dataSourceObjectKeySelector}
        dataSourceObjectByKeySelector={dataSourceObjectByKeySelector}
        onValueChange={onValueChange}
        showSelectionControls={true}
    />
}
