import React from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import { Tribe } from './Tribe'

interface CommonSettings {
    incomeTypes: Array<string>
    defaultIncomeType: string
    tribes: Array<Tribe>
}
type TribeSelectCallable = (tribes: Array<Tribe>) => void
type IncomeTypeChangeCallable = (incomeType: string) => void

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
            // defaultValue={this.defaultPosition}
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

export default function CommonSettingsPanel(
    {
        incomeTypes,
        defaultIncomeType,
        tribes,
        onTribeSelect,
        onIncomeTypeChange
    }:
        CommonSettings &
        { onTribeSelect: TribeSelectCallable } &
        { onIncomeTypeChange: IncomeTypeChangeCallable }
) {
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
