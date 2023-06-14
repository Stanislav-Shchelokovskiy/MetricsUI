import React, { useMemo } from 'react'
import { Tribe } from '../../../common/Interfaces'
import { fetchTents } from '../../../common/network_resource_fetcher/FetchTents'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeSelectedTents } from '../../store/Actions'
import { ForecasterStore, useForecasterSelector } from '../../store/Store'

function areEqual(prevState: Array<string>, newState: Array<string>) {
    return prevState && newState && prevState.sort().join(',') === newState.sort().join(',')
}

export default function TentsSelector() {
    const selectedTents = useForecasterSelector((store: ForecasterStore) => store.forecaster.tents?.map(tent => tent.id), areEqual)
    const changeSelectedTentsAction = (allValues: Array<Tribe>, selectedValues: Array<string>) => {
        let tents: Array<Tribe> = []
        for (const tent_id of selectedValues) {
            tents.push((allValues.find(tent => tent.id === tent_id) as Tribe))
        }
        return changeSelectedTents(tents)
    }

    const defaultValue = useMemo(() => [], [])

    return <MultiOptionSelector<Tribe, string>
        className='TentsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tents to display...'
        label='Tents'
        fetchDataSource={fetchTents}
        value={selectedTents}
        defaultValue={defaultValue}
        onValueChange={changeSelectedTentsAction}
        showSelectionControls={true}
    />
}

TentsSelector.defaultProps = {
    onIncludeChange: undefined
}
