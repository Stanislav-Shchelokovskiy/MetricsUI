import React from 'react'
import ReplyTypeSelector from './ReplyTypeSelector'


const ForecastSettingsPanel = React.memo(
    function ForecastSettingsPanel({ tribeId }: { tribeId: string }) {
        return (
            <div className='ForecastHeader'>
                <ReplyTypeSelector tribeId={tribeId} />
            </div>
        )
    }
)

export default ForecastSettingsPanel
