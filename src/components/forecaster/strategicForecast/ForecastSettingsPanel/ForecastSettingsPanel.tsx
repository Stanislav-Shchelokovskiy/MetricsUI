import React from 'react'
import PositionsSelector from './PositionsSelector'
import ForecastHorizonSelector from './ForecastHorizonSelector'
import TilesSelector from './TilesSelector'


const ForecastSettingsPanel = React.memo(
    function ForecastSettingsPanel({ tribeId, }: { tribeId: string }) {
        return (
            <div className='ForecastHeader'>
                <ForecastHorizonSelector tribeId={tribeId} />
                <TilesSelector tribeId={tribeId} />
                <PositionsSelector tribeId={tribeId} />
            </div>
        )
    })

export default ForecastSettingsPanel
