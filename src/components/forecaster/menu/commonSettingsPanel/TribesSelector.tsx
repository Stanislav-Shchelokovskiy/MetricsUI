import React from 'react'
import { Tribe } from '../../../common/Interfaces'
import { fetchTribes } from '../../../common/network_resource_fetcher/FetchAvailableTribes'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeSelectedTribes } from '../../store/Actions'
import { ForecasterStore, useForecasterSelector } from '../../store/Store'

function areEqual(prevState: Array<string>, newState: Array<string>) {
    return prevState.sort().join(',') === newState.sort().join(',')
}

export default function TribesSelector() {
    const selectedTribes = useForecasterSelector((store: ForecasterStore) => store.forecaster.tribes.map(tribe => tribe.id), areEqual)
    const changeSelectedTribesAction = (allValues: Array<Tribe>, selectedValues: Array<string>) => {
        let tribes: Array<Tribe> = []
        for (const tribe_id of selectedValues) {
            tribes.push((allValues.find(tribe => tribe.id === tribe_id) as Tribe))
        }
        return changeSelectedTribes(tribes)
    }

    return <MultiOptionSelector<Tribe, string>
        className='TribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tribes to display...'
        label='Tribes'
        fetchDataSource={fetchTribes}
        value={selectedTribes}
        onValueChange={changeSelectedTribesAction}
        showSelectionControls={true}
    />
}

TribesSelector.defaultProps = {
    onIncludeChange: undefined
}
