import React from 'react'
import PositionsSelector from './PositionsSelector'
import ForecastHorizonSelector from './ForecastHorizonSelector'
import TilesSelector from './TilesSelector'


const ForecastSettingsPanel = React.memo(
    function ForecastSettingsPanel() {
        return (
            <div className='ForecastHeader'>
                <ForecastHorizonSelector />
                <TilesSelector />
                <PositionsSelector />
            </div>
        )
    })

export default ForecastSettingsPanel
