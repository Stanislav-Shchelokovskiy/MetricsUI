import React, { useState, useEffect } from "react";
import TagBox from 'devextreme-react/tag-box';
import SelectBox from 'devextreme-react/select-box';
import Validator, { RequiredRule } from 'devextreme-react/validator';

export interface Tribe {
    id: string
    name: string
}

interface TribesList {
    tribes?: Array<Tribe>
}

function IncomeSelector() {
    return (
        <div className="IncomeTypeSelector">
            <SelectBox
                dataSource={["income 1", "income 2"]}
                label="Income type"
                labelMode="static"
                value="income 1"
            />
        </div>
    )
}

function PositionsSelector() {
    return (
        <div className="PositionsSelector">
            <TagBox
                placeholder="Select positions to filter by..."
                dataSource={["Support", "Developer"]}
                multiline={true}
                selectAllMode="allPages"
                showSelectionControls={true}
                showDropDownButton={false}
                label="Display only positions"
                labelMode="static"
            />
        </div>
    )

}

function TribesSelector({ tribes }: TribesList) {
    return (<div className="TribesSelector">
        <TagBox
            items={tribes?.map((tribe) => {
                return tribe.name
            })}
            placeholder="Select tribes to display..."
            // defaultValue={this.defaultPosition}
            multiline={true}
            selectAllMode="allPages"
            showSelectionControls={true}
            showDropDownButton={false}
            label="Tribes"
            labelMode="static"
        >
            <Validator>
                <RequiredRule />
            </Validator>
        </TagBox>
    </div>)
}

function CommonSettingsPanel({ tribes }: TribesList) {
    return (
        <div className="CommonSettingsPanel">
            <IncomeSelector />
            <PositionsSelector />
            <TribesSelector tribes={tribes} />
        </div>
    )

}

export default CommonSettingsPanel