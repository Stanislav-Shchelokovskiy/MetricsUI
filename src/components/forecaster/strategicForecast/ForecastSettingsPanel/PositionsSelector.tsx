import React, { useMemo } from 'react'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changePositionsFilter } from '../../store/Actions'
import { ForecasterStore, useForecasterSelector } from '../../store/Store'


export default function PositionsSelector({ tentId }: { tentId: string }) {
    const positions = useMemo<Array<string>>(() => { return ['Support', 'Developer', 'EM', 'PM', 'Technical Writer'] }, [])
    const selectedPositions = useForecasterSelector((store: ForecasterStore) => store.strategicForecast.find(x => x.tentId === tentId)?.positionsFilter || [])
    const onPositionsChange = (allValues: Array<string>, selectedValues: Array<string>) => changePositionsFilter(tentId, selectedValues)

    const defaultValue = useMemo(() => [], [])

    return <MultiOptionSelector<string, string>
        className='PositionsSelector'
        placeholder='Select positions to filter by...'
        label='Display only positions'
        showSelectionControls={true}
        container='#tribe_accordion'
        defaultValue={defaultValue}
        dataSource={positions}
        value={selectedPositions}
        onValueChange={onPositionsChange} />
}
