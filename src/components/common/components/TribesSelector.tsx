import React, { useState, useEffect, useRef } from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import FetchResult, { Tribe } from '../Interfaces'
import { useAppDispatch, useAppSelector, AppStore } from '../AppStore'
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

    const tribes = useTribes()
    const defaultValue = useSelectedTribes(stateSelector)
    const onTribeSelect = useSelectTribeDispatch(tribes, changeSelectedTribesAction)

    return <MultiOptionSelector<Tribe, string>
        className='TribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tribes to display...'
        label='Tribes'
        dataSource={tribes}
        selectedValues={defaultValue}
        onValueChange={onTribeSelect}
        showSelectionControls={true}
    />
}


function useTribes() {
    const [tribes, setTribes] = useState<Array<Tribe>>([])
    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<Tribe>> = await fetchTribes()
            if (fetchResult.success) {
                setTribes(fetchResult.data)
            }
        })()
    }, [])
    return tribes
}

function useSelectedTribes(stateSelector: (store: AppStore) => Array<Tribe>,) {
    const selectedTribes = useAppSelector(stateSelector)
    return selectedTribes?.map(tribe => tribe.id)
}

function useSelectTribeDispatch(tribes: Array<Tribe>, changeSelectedTribesAction: (selectedTribes: Array<Tribe>) => PayloadAction<any>) {
    const dispatch = useAppDispatch()
    return (values: Array<string>) => {
        const selectedTribes = (values.map(tribeId => tribes.find(tribe => tribe.id === tribeId)) as Array<Tribe>)
        dispatch(changeSelectedTribesAction(selectedTribes))
    }
}
