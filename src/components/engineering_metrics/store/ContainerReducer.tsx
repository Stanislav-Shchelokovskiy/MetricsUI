import { PayloadAction } from '@reduxjs/toolkit'
import { APPLY_STATE } from '../../common/store/view_state/Actions'
import { MultisetContainerStore } from '../../common/store/multiset_container/Store'
import { getAction } from '../../common/store/Actions'
import { Metric } from '../../common/components/multiset_container/graph/metric_selector/Metric'
import { Context } from '../../common/store/multiset_container/Context'


const CHANGE_METRIC = 'change_metric'
export const changeMetric = getAction<Metric>(CHANGE_METRIC)

const CHANGE_CONTEXT = 'change_context'
export const changeContext = getAction<Context>(CHANGE_CONTEXT)


export interface ContainerState {
    context: Context
    metric: string
}


export function containerReducer(state: ContainerState, action: PayloadAction<any>): ContainerState {
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

        case APPLY_STATE:
            return asContainerState(action.payload as MultisetContainerStore)

        default:
            return state
    }
}

function asContainerState(source: MultisetContainerStore): ContainerState {
    return newContainerState(source.container.context, source.container.metric)
}

export function newContainerState(context: Context, metric: string): ContainerState {
    return {
        context: context,
        metric: metric,
    }
}
