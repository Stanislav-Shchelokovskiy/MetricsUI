import React, { useCallback } from 'react'
import IncomeSelector from './IncomeSelector'
import TribesSelector from '../../../common/components/TribesSelector'
import { AppStore } from '../../../common/AppStore'
import { changeSelectedTribes } from '../../store/Actions'
import { Tribe } from '../../../common/Interfaces'


function CommonSettingsPanel() {
    const stateSelector = (store: AppStore) => (store.forecaster.tribes || []).map(tribe => tribe.id)
    const changeSelectedTribesAction = (allValues: Array<Tribe>, selectedValues: Array<string>) => {
        let tribes: Array<Tribe> = []
        for (const tribe_id of selectedValues) {
            tribes.push((allValues.find(tribe => tribe.id === tribe_id) as Tribe))
        }
        return changeSelectedTribes(tribes)
    }
    return (
        <div className='ForecasterCommonSettingsPanel'>
            <IncomeSelector />
            <TribesSelector
                stateSelector={stateSelector}
                changeSelectedTribesAction={changeSelectedTribesAction}/>
        </div>
    )
}

export default React.memo(CommonSettingsPanel)
