import React from 'react'
import PositionsSelector from './PositionsSelector'
import ForecastHorizonSelector from './ForecastHorizonSelector'
import TilesSelector from './TilesSelector'


const ForecastSettingsPanel = React.memo(
    function ForecastSettingsPanel({ tentId }: { tentId: string }) {
        return (
            <div className='ForecastHeader'>
                <ForecastHorizonSelector tentId={tentId} />
                <TilesSelector tentId={tentId} />
                <PositionsSelector tentId={tentId} />
            </div>
        )
    })

export default ForecastSettingsPanel
