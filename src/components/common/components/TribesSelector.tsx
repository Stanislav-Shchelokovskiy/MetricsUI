import React, { useState, useEffect, useRef } from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import FetchResult, { Tribe } from '../Interfaces'
import LoadIndicator from '../LoadIndicator'
import { useAppDispatch, useAppSelector, AppStore } from '../AppStore'
import { fetchTribes } from '../network_resource_fetcher/FetchAvailableTribes'


export default function TribesSelector(
    {
        stateSelector,
        changeSelectedTribesAction
    }:
        {
            stateSelector: (store: AppStore) => Array<Tribe>,
            changeSelectedTribesAction: (selectedTribes: Array<Tribe>) => PayloadAction<any>
        }) {
    const renderCount = useRef(0)
    console.log(' TribesSelector render ', renderCount.current++)

    const [tribes, setTribes] = useState<Array<Tribe>>([])
    const selectedTribes = useAppSelector(stateSelector)
    const defaultValue = selectedTribes?.map(tribe => tribe.id)

    const dispatch = useAppDispatch()
    const onTribeSelect: (tribes: Array<string>) => void = (tribeIds: Array<string>) => {
        const selectedTribes = (tribeIds.map(tribeId => tribes.find(tribe => tribe.id === tribeId)) as Array<Tribe>)
        dispatch(changeSelectedTribesAction(selectedTribes))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<Tribe>> = await fetchTribes()
            if (fetchResult.success) {
                setTribes(fetchResult.data)
            }
        })()
    }, [])

    if (tribes.length > 0) {
        return (
            <TagBox className='TribesSelector'
                displayExpr='name'
                valueExpr='id'
                dataSource={tribes}
                defaultValue={defaultValue}
                onValueChange={onTribeSelect}
                placeholder='Select tribes to display...'
                multiline={true}
                selectAllMode='allPages'
                showSelectionControls={true}
                showDropDownButton={false}
                label='Tribes'
                labelMode='static'>
                <DropDownOptionsTagBox
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true} />
            </TagBox>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}
