import React, { useMemo } from 'react'
import { MultiOptionSelector } from '../../../common/components/MultiOptionSelector'
import { changePositionsFilter } from '../../store/Actions'
import { ForecasterStore, useForecasterSelector } from '../../store/Store'


export default function PositionsSelector({ tribeId }: { tribeId: string }) {
    const positions = useMemo<Array<string>>(() => { return ['Support', 'Developer', 'EM', 'PM', 'Technical Writer'] }, [])
    const selectedPositions = useForecasterSelector((store: ForecasterStore) => store.strategicForecast.find(x => x.tribeId === tribeId)?.positionsFilter || [])
    const onPositionsChange = (allValues: Array<string>, selectedValues: Array<string>) => changePositionsFilter(tribeId, selectedValues)

    return <MultiOptionSelector<string, string>
        className='PositionsSelector'
        placeholder='Select positions to filter by...'
        label='Display only positions'
        showSelectionControls={true}
        container='#tribe_accordion'
        dataSource={positions}
        defaultValue={selectedPositions}
        onValueChange={onPositionsChange} />
}
