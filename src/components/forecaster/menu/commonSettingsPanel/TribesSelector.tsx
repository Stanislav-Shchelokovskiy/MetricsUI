import React from 'react'
import { Tribe } from '../../../common/Interfaces'
import { AppStore, useAppSelector } from '../../../common/AppStore'
import { fetchTribes } from '../../../common/network_resource_fetcher/FetchAvailableTribes'
import MultiOptionSelectorWithFetch from '../../../common/components/MultiOptionSelector'
import { changeSelectedTribes } from '../../store/Actions'

function areEqual(prevState: Array<string>, newState: Array<string>) {
    return prevState.sort().join(',') === newState.sort().join(',')
}

export default function TribesSelector() {
    const selectedTribes = useAppSelector((store: AppStore) => store.forecaster.tribes.map(tribe => tribe.id), areEqual)
    const changeSelectedTribesAction = (allValues: Array<Tribe>, selectedValues: Array<string>) => {
        let tribes: Array<Tribe> = []
        for (const tribe_id of selectedValues) {
            tribes.push((allValues.find(tribe => tribe.id === tribe_id) as Tribe))
        }
        return changeSelectedTribes(tribes)
    }

    return <MultiOptionSelectorWithFetch<Tribe, string>
        className='TribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tribes to display...'
        label='Tribes'
        fetchDataSourceValues={fetchTribes}
        defaultValue={selectedTribes}
        onValueChange={changeSelectedTribesAction}
        showSelectionControls={true}
    />
}

TribesSelector.defaultProps = {
    onIncludeChange: undefined
}
