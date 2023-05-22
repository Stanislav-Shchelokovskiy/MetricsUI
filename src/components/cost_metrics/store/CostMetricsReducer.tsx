import { AnyAction } from '@reduxjs/toolkit'
import { BaseContainerState } from '../../common/store/set_container/Interfaces'
import { getDefaultTitle } from '../../common/store/set_container/sets/Defaults'


export interface CostMetricsState extends BaseContainerState { }

const INITIAL_COST_METRICS_STATE: CostMetricsState = {
    sets: [getDefaultTitle()],
    hiddenLegends: Array<string>()
}

export const CostMetricsReducer = (state: CostMetricsState = INITIAL_COST_METRICS_STATE, action: AnyAction): CostMetricsState => {
    switch (action.type) {

        default:
            return state
    }
}
