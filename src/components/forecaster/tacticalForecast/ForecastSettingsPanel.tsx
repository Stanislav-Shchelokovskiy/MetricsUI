import React from 'react'
import ReplyTypeSelector from './ReplyTypeSelector'


const ForecastSettingsPanel = React.memo(
    function ForecastSettingsPanel({ tentId }: { tentId: string }) {
        return (
            <div className='ForecastHeader'>
                <ReplyTypeSelector tentId={tentId} />
            </div>
        )
    }
)

export default ForecastSettingsPanel
