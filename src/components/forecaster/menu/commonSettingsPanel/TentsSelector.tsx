import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Knot } from '../../../common/Typing'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { fetchTents } from '../../network_resource_fetcher/Tents'
import { changeSelectedTents } from '../../store/forecaster/Actions'
import { ForecasterStore } from '../../store/Store'
import { tentIdsSelector } from '../../store/forecaster/Selectors'

function areEqual(prevState: Array<string>, newState: Array<string>) {
    return prevState && newState && prevState.sort().join(',') === newState.sort().join(',')
}

export default function TentsSelector() {
    const selectedTentIds = useSelector((store: ForecasterStore) => tentIdsSelector(store), areEqual)
    const onValueChange = useCallback((allValues: Array<Knot>, selectedValues: Array<string>) => {
        let tents: Array<Knot> = []
        for (const tentId of selectedValues) {
            tents.push((allValues.find(tent => tent.id === tentId) as Knot))
        }
        return changeSelectedTents(tents)
    }, [])

    const defaultValue = useMemo(() => [], [])

    return <MultiOptionSelector<Knot, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select tents to display...'
        label='Tents'
        fetchDataSource={fetchTents}
        value={selectedTentIds}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        showSelectionControls={true} />
}
