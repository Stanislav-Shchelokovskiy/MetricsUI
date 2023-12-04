import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changePositionsFilter } from '../../store/strategic_forecast/Actions'
import { ForecasterStore } from '../../store/Store'
import { useTentId } from '../../tent/TentContext'
import { positionsSelector } from '../../store/strategic_forecast/Selectors'


export default function PositionsSelector() {
    const ds = useMemo<Array<string>>(() => { return ['Support', 'Developer', 'Chapter Manager', 'EM', 'PM', 'Technical Writer'] }, [])

    const tentId = useTentId()
    const selectedPositions = useSelector((store: ForecasterStore) => positionsSelector(store, tentId))
    const onPositionsChange = (allValues: Array<string>, selectedValues: Array<string>) => changePositionsFilter(tentId, selectedValues)
    const defaultValue = useMemo(() => [], [])

    return <MultiOptionSelector<string, string>
        className='PositionsSelector'
        placeholder='Select positions to filter by...'
        label='Display only positions'
        showSelectionControls={true}
        container='#tribe_accordion'
        defaultValue={defaultValue}
        dataSource={ds}
        value={selectedPositions}
        onValueChange={onPositionsChange} />
}
