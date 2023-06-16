import { PayloadAction } from '@reduxjs/toolkit'
import { CHANGE_CONTEXT } from './Actions'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'

export enum Context {
    Support = 0,
    Cost = 1,
}

export interface ContainerState {
    metric: Metric
}

const INITIAL_STATE: ContainerState = {
    metric: { name: '', context: Context.Support }
}

export function containerReducer(state: ContainerState = INITIAL_STATE, action: PayloadAction<any>): ContainerState {
    switch (action.type) {

        case CHANGE_CONTEXT:
            return {
                ...state,
                metric: action.payload
            }

        default:
            return state
    }
}
