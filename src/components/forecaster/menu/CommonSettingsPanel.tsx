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
        onTribeSelect
    }:
        { tribes: Array<Tribe> } &
        { onTribeSelect: TribeSelectCallable }
) {
    const renderItem = (tribe: Tribe) => {
        return <div>{tribe.name}</div>
    }
    const renderTag = (tribe: Tribe) => {
        return (
            <div className='dx-tag-content'>
                {tribe.name}
                <div className='dx-tag-remove-button'></div>
            </div>
        )
    }

    return (
        <TagBox className='TribesSelector'
            itemRender={renderItem}
            tagRender={renderTag}
            items={tribes}
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

type TribeSelectCallable = (tribes: Array<Tribe>) => void
type IncomeTypeChangeCallable = (incomeType: string) => void

interface CommonSettingsPanelState {
    incomeTypes: Array<string>
    defaultIncomeType: string
    tribes: Array<Tribe>
    forecastDispatch: React.Dispatch<Action>
}

export default function CommonSettingsPanel({ incomeTypes, defaultIncomeType, tribes, forecastDispatch }: CommonSettingsPanelState) {
    const onIncomeTypeChange: IncomeTypeChangeCallable = (incomeType: string) => {
        forecastDispatch({ type: 'incomeTypeChange', payload: incomeType })
    }

    const onTribeSelect: TribeSelectCallable = (tribes: Array<Tribe>) => {
        forecastDispatch({ type: 'tribesChange', payload: tribes })
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
                onTribeSelect={onTribeSelect}
            />
        </div>
    )
}
