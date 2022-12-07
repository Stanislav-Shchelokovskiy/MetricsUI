import React from 'react'
import IncomeSelector from './IncomeSelector'
import TribesSelector from './TribesSelector'



function CommonSettingsPanel() {
    return (
        <div className='ForecasterCommonSettingsPanel'>
            <IncomeSelector />
            <TribesSelector />
        </div>
    )
}

export default React.memo(CommonSettingsPanel)
