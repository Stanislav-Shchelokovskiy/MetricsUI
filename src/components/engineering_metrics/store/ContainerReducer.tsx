import { PayloadAction } from '@reduxjs/toolkit'
import {
    CHANGE_METRIC,
    CHANGE_CONTEXT,
} from './Actions'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'
import { Context } from '../../common/store/multiset_container/Context'



export interface ContainerState {
    context: Context
    metric: string
}

const INITIAL_STATE: ContainerState = {
    context: Context.Support,
    metric: '',
}

export function containerReducer(state: ContainerState = INITIAL_STATE, action: PayloadAction<any>): ContainerState {
    switch (action.type) {

        case CHANGE_METRIC:
            const metric = action.payload as Metric
            return {
                ...state,
                metric: metric.name,
                context: metric.context,
            }

        case CHANGE_CONTEXT:
            return {
                ...state,
                context: action.payload,
            }

        default:
            return state
    }
}
