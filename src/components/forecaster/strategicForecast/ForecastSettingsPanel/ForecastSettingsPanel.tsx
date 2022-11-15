import React from 'react'
import PositionsSelector from './PositionsSelector'
import ForecastHorizonSelector from './ForecastHorizonSelector'
import TilesSelector from './TilesSelector'


const ForecastSettingsPanel = React.memo(
    function ForecastSettingsPanel(
        {
            tribeId,
            forecastHorizon,
            tile,
            positionsFilter
        }:
            {
                tribeId: string
                forecastHorizon: string
                tile: number
                positionsFilter: Array<string>
            }
    ) {
        return (
            <div className='ForecastHeader'>
                <ForecastHorizonSelector
                    tribeId={tribeId}
                    defaultForecastHorizon={forecastHorizon} />
                <TilesSelector
                    tribeId={tribeId}
                    defaultTile={tile} />
                <PositionsSelector
                    tribeId={tribeId}
                    defaultPositions={positionsFilter} />
            </div>
        )
    })

export default ForecastSettingsPanel
