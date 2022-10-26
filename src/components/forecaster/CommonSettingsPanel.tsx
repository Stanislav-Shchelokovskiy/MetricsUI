import React from 'react';
import TagBox from 'devextreme-react/tag-box';
import SelectBox from 'devextreme-react/select-box';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import { Tribe } from './Tribe'


function IncomeSelector({ incomeTypes }: { incomeTypes: Array<string> }) {
    return (
        <div className='IncomeTypeSelector'>
            <SelectBox
                dataSource={incomeTypes}
                label='Income type'
                labelMode='static'
                value={incomeTypes?.[0]}
            />
        </div>
    )
}

function PositionsSelector() {
    return (
        <div className='PositionsSelector'>
            <TagBox
                placeholder='Select positions to filter by...'
                dataSource={['Support', 'Developer']}
                multiline={true}
                selectAllMode='allPages'
                showSelectionControls={true}
                showDropDownButton={false}
                label='Display only positions'
                labelMode='static'
            />
        </div>
    )
}

function TribesSelector({ tribes }: { tribes: Array<Tribe> }) {
    return (<div className='TribesSelector'>
        <TagBox
            items={tribes?.map((tribe) => {
                return tribe.name
            })}
            placeholder='Select tribes to display...'
            // defaultValue={this.defaultPosition}
            multiline={true}
            selectAllMode='allPages'
            showSelectionControls={true}
            showDropDownButton={false}
            label='Tribes'
            labelMode='static'
        >
            {/* <Validator>
                <RequiredRule/>
            </Validator> */}
        </TagBox>
    </div>)
}

interface CommonSettings {
    incomeTypes: Array<string>
    tribes: Array<Tribe>
}

export default function CommonSettingsPanel({ incomeTypes, tribes }: CommonSettings) {
    return (
        <div className='CommonSettingsPanel'>
            <IncomeSelector incomeTypes={incomeTypes} />
            <PositionsSelector />
            <TribesSelector tribes={tribes} />
        </div>
    )

}
