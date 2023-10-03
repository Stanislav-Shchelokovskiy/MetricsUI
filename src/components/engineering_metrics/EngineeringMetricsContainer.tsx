import React, { useCallback, useMemo, FC } from 'react'
import { Provider, useStore, useDispatch, useSelector } from 'react-redux'
import { changeMetric, changeContext, resetContext } from './store/Actions'
import {
    isSupportContextSelected,
    isCostContextSelected,
    contextOrDefault,
    Context
} from '../common/store/multiset_container/Context'
import { contextSelector } from './store/Selectors'
import { MultisetContainerContext, useMultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import ApplySharedState from '../common/components/state_management/ApplySharedState'

import { fetchMetrics } from './fetchMetrics'
import { Metric } from '../common/components/multiset_container/graph/MetricSelector'
import { EngineeringMetricsStore } from './store/Store'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import { SettingsSets } from '../common/components/multiset_container/MultisetContainer'
import SupportMetricsSet from '../support_metrics/content/set/Set'
import CostMetricsSet from '../cost_metrics/content/set/Set'
import PerformanceMetricsSet from '../performance_metrics/content/set/Set'
import SupportMetricsToolbar from '../support_metrics/toolbar/Toolbar'
import CostMetricsToolbar from '../cost_metrics/toolbar/Toolbar'
import PerformanceMetricsToolbar from '../performance_metrics/toolbar/Toolbar'
import { ContainerState } from './store/ContainerReducer'
import { engineeringMetricsStore } from './store/Store'
import { MultisetContainerStore } from '../common/store/multiset_container/Store'
import { applyState } from '../common/store/view_state/Actions'
import LocalStatesConverter from './LocalStatesConverter'
import ErrorNotifier from '../app_components/ErrorNotifier'
import { getContext } from './Utils'
import { multisetStore } from './store/MetricsStore'


export default function EngineeringMetrics() {
    return <EngineeringMetricsContainer content={EngineeringMetricsContent} />
}


export function EngineeringMetricsApplySharedState({ context }: { context: Context }) {
    engineeringMetricsStore.dispatch(changeContext(context))
    return <EngineeringMetricsContainer content={ApplySharedState} />
}


interface Props { content: FC<ContainerState> }
function EngineeringMetricsContainer(props: Props) {
    return (
        <Provider store={engineeringMetricsStore}>
            <LocalStatesConverter>
                <ErrorNotifier>
                    <EngineeringMetricsContainerInner {...props} />
                </ErrorNotifier>
            </LocalStatesConverter>
        </Provider>
    )
}


function EngineeringMetricsContainerInner(props: Props) {
    const ctx = useSelector(contextSelector)
    multisetStore.changeContext(ctx, true)

    const dispatch = useDispatch()
    const dispatchMetric = useCallback((metric: Metric) => {
        dispatch(changeMetric(metric))
    }, [])

    const dispatchState = useCallback((contentState: MultisetContainerStore | undefined) => {
        if (contentState === undefined) {
            dispatch(resetContext(undefined))
            return
        }
        const context = contextOrDefault(contentState.container?.context)
        multisetStore.changeContext(context)
        multisetStore.dispatch(applyState(contentState))

        dispatch(applyState(multisetStore.getState()))
    }, [])

    const context = useMemo(() => {
        const baseContext = getContext(ctx)
        baseContext.stateManagement.getShareableState = multisetStore.getShareableState
        return {
            ...baseContext,
            fetchMetrics: fetchMetrics,
            changeMetric: dispatchMetric,
            changeState: dispatchState,
            context: ctx,
        }
    }, [ctx])

    const store = useStore<EngineeringMetricsStore>()
    return <MultisetContainerContext.Provider value={context}>
        <Provider store={multisetStore}>
            <props.content {...store.getState()} />
        </Provider>
    </MultisetContainerContext.Provider >
}


function EngineeringMetricsContent(props: ContainerState) {
    return <MultisetContainer
        metric={props.metric}
        sets={Sets}
        toolbar={getToolbar(props.context)}
    />
}


function Sets() {
    const { context } = useMultisetContainerContext()
    return <SettingsSets set={
        isSupportContextSelected(context) ? SupportMetricsSet : (
            isCostContextSelected(context) ? CostMetricsSet :
                PerformanceMetricsSet)} />
}


function getToolbar(ctx: Context) {
    return isSupportContextSelected(ctx) ? SupportMetricsToolbar : (
        isCostContextSelected(ctx) ? CostMetricsToolbar :
            PerformanceMetricsToolbar
    )
}
