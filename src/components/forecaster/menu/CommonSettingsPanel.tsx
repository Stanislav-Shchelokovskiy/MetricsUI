import React from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import { Tribe } from '../Tribe'
import { Action } from '../Forecaster'

function IncomeSelector(
    {
        incomeTypes,
        defaultIncomeType,
        onIncomeTypeChange
    }:
        { incomeTypes: Array<string> } &
        { defaultIncomeType: string } &
        { onIncomeTypeChange: IncomeTypeChangeCallable }
) {
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

export default function CommonSettingsPanel({ incomeTypes, defaultIncomeType, tribes, defaultTribes, forecastDispatch }: CommonSettingsPanelState) {
    const onIncomeTypeChange: IncomeTypeChangeCallable = (incomeType: string) => {
        forecastDispatch({ type: 'incomeTypeChange', payload: incomeType })
    }

    const onTribeSelect: TribeSelectCallable = (tribeIds: Array<string>) => {
        const selectedTribes = tribeIds.map(tribeId => tribes.find(tribe => tribe.id === tribeId))
        forecastDispatch({ type: 'tribesChange', payload: selectedTribes })
    }

    return (
        <div className='CommonSettingsPanel'>
            <IncomeSelector
                incomeTypes={incomeTypes}
                defaultIncomeType={defaultIncomeType}
                onIncomeTypeChange={onIncomeTypeChange}
            />
            <TribesSelector
                tribes={tribes}
                defaultTribes={defaultTribes}
                onTribeSelect={onTribeSelect}
            />
        </div>
    )
}
