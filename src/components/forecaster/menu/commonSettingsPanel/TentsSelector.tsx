import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Tribe } from '../../../common/Interfaces'
import { fetchTents } from '../../../common/network_resource_fetcher/FetchTents'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeSelectedTents } from '../../store/forecaster/Actions'
import { ForecasterStore } from '../../store/Store'
import { tentIdsSelector } from '../../store/forecaster/Selectors'

function areEqual(prevState: Array<string>, newState: Array<string>) {
    return prevState && newState && prevState.sort().join(',') === newState.sort().join(',')
}

export default function TentsSelector() {
    const selectedTentIds = useSelector((store: ForecasterStore) => tentIdsSelector(store), areEqual)
    const onValueChange = useCallback((allValues: Array<Tribe>, selectedValues: Array<string>) => {
        let tents: Array<Tribe> = []
        for (const tentId of selectedValues) {
            tents.push((allValues.find(tent => tent.id === tentId) as Tribe))
        }
        return changeSelectedTents(tents)
    }, [])

    const defaultValue = useMemo(() => [], [])

    return <MultiOptionSelector<Tribe, string>
        className='TentsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tents to display...'
        label='Tents'
        fetchDataSource={fetchTents}
        value={selectedTentIds}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        showSelectionControls={true}
    />
}

TentsSelector.defaultProps = {
    onIncludeChange: undefined
}