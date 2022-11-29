import React, { useCallback } from 'react'
import IncomeSelector from './IncomeSelector'
import TribesSelector from '../../../common/components/TribesSelector'
import { AppStore } from '../../../common/AppStore'
import { changeSelectedTribes } from '../../store/Actions'


function CommonSettingsPanel() {
    const stateSelector = useCallback((store: AppStore) => store.forecaster.selectedTribes, [])
    const changeSelectedTribesAction = useCallback(changeSelectedTribes, [])
    return (
        <div className='ForecasterCommonSettingsPanel'>
            <IncomeSelector />
            <TribesSelector
                stateSelector={stateSelector}
                changeSelectedTribesAction={changeSelectedTribesAction} />
        </div>
    )
}

export default React.memo(CommonSettingsPanel)
