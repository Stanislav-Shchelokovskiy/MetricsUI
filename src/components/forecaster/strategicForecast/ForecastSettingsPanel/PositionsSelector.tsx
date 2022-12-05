import React, { useMemo } from 'react'
import { MultiOptionSelector } from '../../../common/components/MultiOptionSelector'
import { changePositionsFilter } from '../../store/Actions'
import { AppStore } from '../../../common/AppStore'


export default function PositionsSelector({ tribeId }: { tribeId: string }) {
    const positions = useMemo<Array<string>>(() => { return ['Support', 'Developer', 'EM', 'PM', 'Technical Writer'] }, [])
    const stateSelector = (store: AppStore) => store.strategicForecast.find(x => x.tribeId === tribeId)?.positionsFilter || []
    const onPositionsChange = (allValues: Array<string>, selectedValues: Array<string>) => {
        return changePositionsFilter(tribeId, selectedValues)
    }

    return <MultiOptionSelector<string, string>
        className='PositionsSelector'
        placeholder='Select positions to filter by...'
        label='Display only positions'
        showSelectionControls={true}
        container='#tribe_accordion'
        dataSource={positions}
        stateSelector={stateSelector}
        onValueChange={onPositionsChange} />
}
