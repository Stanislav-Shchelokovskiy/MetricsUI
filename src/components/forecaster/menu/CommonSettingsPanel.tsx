import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import { Tribe } from '../Tribe'
import { Action } from '../Forecaster'
import LoadIndicator from '../utils/LoadIndicator'
import FetchResult from '../network_resource_fetcher/FetchResult'
import { fetchIncomeTypes } from '../network_resource_fetcher/FetchForecastSettingsValues'
import getValueFromStoreOrDefault from '../utils/LocalStorage'
import { useDispatch, useSelector } from 'react-redux';
import {ForecasterState} from '../store/ForecasterState'

function IncomeSelector(
    {
        onIncomeTypeChange
    }:
        { defaultIncomeType: string } &
        { onIncomeTypeChange: IncomeTypeChangeCallable }
) {

    const [incomeTypes, setIncomeTypes] = useState<Array<string>>([])
   // const defaultIncomeType = getValueFromStoreOrDefault<string>('incomeType', incomeTypes[0], incomeTypes)

    const defaultIncomeType = useSelector((state: ForecasterState) => state.incomeType)
    const dispatch = useDispatch()

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

function TribesSelector(
    {
        tribes,
        defaultTribes,
        onTribeSelect
    }:
        { tribes: Array<Tribe> } &
        { defaultTribes: Array<Tribe> } &
        { onTribeSelect: TribeSelectCallable }
) {
    const defaultValue = defaultTribes.map(tribe => tribe.id)
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

type TribeSelectCallable = (tribes: Array<string>) => void
type IncomeTypeChangeCallable = (incomeType: string) => void

interface CommonSettingsPanelState {
    incomeTypes: Array<string>
    defaultIncomeType: string
    tribes: Array<Tribe>
    defaultTribes: Array<Tribe>
    forecastDispatch: React.Dispatch<Action>
}

function CommonSettingsPanel({ incomeTypes, defaultIncomeType, tribes, defaultTribes, forecastDispatch }: CommonSettingsPanelState) {
    const onIncomeTypeChange: IncomeTypeChangeCallable = (incomeType: string) => {
        forecastDispatch({ type: 'incomeTypeChange', payload: incomeType })
    }

    const onTribeSelect: TribeSelectCallable = (tribeIds: Array<string>) => {
        const selectedTribes = tribeIds.map(tribeId => tribes.find(tribe => tribe.id === tribeId))
        forecastDispatch({ type: 'tribesChange', payload: selectedTribes })
    }

    return (
        <div className='CommonSettingsPanel'>
            <IncomeSelector/>
            <TribesSelector
                tribes={tribes}
                defaultTribes={defaultTribes}
                onTribeSelect={onTribeSelect}
            />
        </div>
    )
}

export default React.memo(CommonSettingsPanel);
