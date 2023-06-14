import React from 'react'
import IncomeSelector from './IncomeSelector'
import TentsSelector from './TentsSelector'



function CommonSettingsPanel() {
    return (
        <div className='ForecasterCommonSettingsPanel'>
            <IncomeSelector />
            <TentsSelector />
        </div>
    )
}

export default React.memo(CommonSettingsPanel)
