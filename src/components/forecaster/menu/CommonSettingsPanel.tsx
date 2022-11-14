import React, { useState, useEffect, useRef } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'

import { Tribe } from '../Tribe'

import getValueFromStoreOrDefault from '../utils/LocalStorage'
import LoadIndicator from '../utils/LoadIndicator'

import FetchResult from '../network_resource_fetcher/FetchResult'
import { fetchIncomeTypes, fetchTribes } from '../network_resource_fetcher/FetchForecastSettingsValues'

import { changeIncomeType, changeSelectedTribes } from '../store/ForecasterReducer'
import { ForecasterState } from '../store/ForecasterState'
import { useForecasterDispatch, useForecasterSelector } from '../store/Hooks'

function IncomeSelector() {
    const renderCount = useRef(0)
    console.log('IncomeSelector render: ', renderCount.current++)

    const [incomeTypes, setIncomeTypes] = useState<Array<string>>([])
    const stateIncomeType = useForecasterSelector((state: ForecasterState) => state.forecaster.incomeType)
    const defaultIncomeType = getValueFromStoreOrDefault<string>('incomeType', stateIncomeType, incomeTypes)


    const dispatch = useForecasterDispatch()
    const onIncomeTypeChange: (incomeType: string) => void = (incomeType: string) => {
        dispatch(changeIncomeType(incomeType))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<string>> = await fetchIncomeTypes()
            if (fetchResult.success) {
                setIncomeTypes(fetchResult.data)
            }
        })()
    }, [])

    if (incomeTypes.length > 0) {
        return (
            <SelectBox
                dataSource={incomeTypes}
                defaultValue={defaultIncomeType}
                onValueChange={onIncomeTypeChange}
                label='Income type'
                labelMode='static'>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true} />
            </SelectBox >
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}

function TribesSelector() {
    const renderCount = useRef(0)
    console.log('TribesSelector render: ', renderCount.current++)

    const [tribes, setTribes] = useState<Array<Tribe>>([])
    const stateTribes = useForecasterSelector((state: ForecasterState) => state.forecaster.selectedTribes)
    const defaultTribes = getValueFromStoreOrDefault<Array<Tribe>>('tribes', stateTribes, tribes)
    const defaultValue = defaultTribes?.map(tribe => tribe.id)

    const dispatch = useForecasterDispatch()
    const onTribeSelect: (tribes: Array<string>) => void = (tribeIds: Array<string>) => {
        const selectedTribes = (tribeIds.map(tribeId => tribes.find(tribe => tribe.id === tribeId)) as Array<Tribe>)
        dispatch(changeSelectedTribes(selectedTribes))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<Tribe>> = await fetchTribes()
            if (fetchResult.success) {
                setTribes(fetchResult.data)
            }
        })()
    }, [])

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

function CommonSettingsPanel() {
    const renderCount = useRef(0)
    console.log('CommonSettingsPanel render: ', renderCount.current++)

    return (
        <div className='CommonSettingsPanel'>
            <IncomeSelector />
            <TribesSelector />
        </div>
    )
}

export default CommonSettingsPanel
