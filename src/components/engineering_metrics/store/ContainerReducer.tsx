import { PayloadAction } from '@reduxjs/toolkit'
import {
    CHANGE_METRIC,
    CHANGE_CONTEXT,
    RESET_CONTEXT,
} from './Actions'
import { APPLY_STATE } from '../../common/store/view_state/Actions'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'
import { Context } from '../../common/store/multiset_container/Context'
import { MultisetContainerStore } from '../../common/store/multiset_container/Store'

export interface ContainerState {
    context: Context
    prevContext: Context
    metric: string
}

const INITIAL_STATE: ContainerState = {
    context: Context.Support,
    prevContext: Context.Support,
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
                prevContext: state.context,
            }

        case APPLY_STATE:
            return getContainerState(state, action.payload as MultisetContainerStore)

        case CHANGE_CONTEXT:
            return {
                ...state,
                context: action.payload,
                prevContext: state.context,
            }

        case RESET_CONTEXT:
            return {
                ...state,
                context: state.prevContext,
            }

        default:
            return state
    }
}

function getContainerState(state: ContainerState, source: MultisetContainerStore): ContainerState {
    return {
        context: source.container.context,
        prevContext: state.context,
        metric: source.container.metric,
    }
}
