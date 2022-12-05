import React from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import { Tribe } from '../Interfaces'
import { AppStore } from '../AppStore'
import { fetchTribes } from '../network_resource_fetcher/FetchAvailableTribes'
import MultiOptionSelectorWithFetch from './MultiOptionSelector'


export default function TribesSelector(
    {
        stateSelector,
        changeSelectedTribesAction,
    }:
        {
            stateSelector: (store: AppStore) => Array<string>,
            changeSelectedTribesAction: (allTribes: Array<Tribe>, selectedTribes: Array<string>) => PayloadAction<any>
        }
) {
    return <MultiOptionSelectorWithFetch<Tribe, string>
        className='TribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tribes to display...'
        label='Tribes'
        fetchDataSourceValues={fetchTribes}
        stateSelector={stateSelector}
        onValueChange={changeSelectedTribesAction}
        showSelectionControls={true}
    />
}
