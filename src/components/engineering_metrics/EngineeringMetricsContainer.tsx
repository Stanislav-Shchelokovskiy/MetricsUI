import React, { useCallback, useMemo, FC } from 'react'
import { Provider, useStore, useDispatch, useSelector} from 'react-redux'
import { Store } from '@reduxjs/toolkit'
import { changeMetric, changeContext } from './store/Actions'
import { isSupportContextSelected, contextOrDefault, Context } from '../common/store/multiset_container/Context'
import { contextSelector } from './store/Selectors'
import { MultisetContainerContext, useMultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import { supportMetricsContext } from '../support_metrics/SupportMetricsContainer'
import { costMetricsContext } from '../cost_metrics/CostMetricsContainer'
import { fetchMetrics } from './fetchMetrics'
import { costMetricsStore } from '../cost_metrics/store/Store'
import { supportMetricsStore } from '../support_metrics/store/Store'
import { Metric } from '../common/components/multiset_container/graph/MetricSelector'
import { EngineeringMetricsStore } from './store/Store'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import { SettingsSets } from '../common/components/multiset_container/MultisetContainer'
import SupportMetricsSet from '../support_metrics/content/set/Set'
import CostMetricsSet from '../cost_metrics/content/set/Set'
import SupportMetricsToolbar from '../support_metrics/toolbar/Toolbar'
import CostMetricsToolbar from '../cost_metrics/toolbar/Toolbar'
import { ContainerState } from './store/ContainerReducer'
import { engineeringMetricsStore } from './store/Store'
import { MultisetContainerStore } from '../common/store/multiset_container/Store'
import { applyState } from '../common/store/view_state/Actions'

export default function EngineeringMetrics() {
    return <Provider store={engineeringMetricsStore}>
        <EngineeringMetricsContainer content={EngineeringMetricsContent} />
    </Provider>
}

export function EngineeringMetricsApplySharedState({ context }: { context: Context }) {
    engineeringMetricsStore.dispatch(changeContext(context))
    return <Provider store={engineeringMetricsStore}>
        <EngineeringMetricsContainer content={ApplySharedState} />
    </Provider>
}


interface Props {
    content: FC<ContainerState>
}

function getContext(ctx: Context) {
    if (isSupportContextSelected(ctx))
        return supportMetricsContext
    return costMetricsContext
}

function EngineeringMetricsContainer(props: Props) {
    const ctx = useSelector(contextSelector)
    const dispatch = useDispatch()
    const dispatchMetric = useCallback((metric: Metric) => {
        dispatch(changeMetric(metric))
    }, [])

    const dispatchState = useCallback((state: MultisetContainerStore) => {
        console.log(state)
        const context = contextOrDefault(state.container?.context)
        const store = getStore(context)
        store.dispatch(applyState(state))
        dispatch(changeContext(context))
    }, [])

    const context = useMemo(() => {
        return {
            ...getContext(ctx),
            fetchMetrics: fetchMetrics,
            changeMetric: dispatchMetric,
            changeState: dispatchState,
            context: ctx,
        }
    }, [ctx])

    const store = useStore<EngineeringMetricsStore>()
    const state = store.getState()
    return <MultisetContainerContext.Provider value={context}>
        <Provider store={getStore(ctx)}>
            <props.content {...state} />
        </Provider>
    </MultisetContainerContext.Provider >
}

function EngineeringMetricsContent(props: ContainerState) {
    //console.log(window.location.href.replace(window.location.pathname, '/qwe'))
    return <MultisetContainer
        metric={props.metric}
        sets={Sets}
        toolbar={getToolbar(props.context)}
    />
}

function Sets() {
    const { context } = useMultisetContainerContext()
    return <SettingsSets set={isSupportContextSelected(context) ? SupportMetricsSet : CostMetricsSet} />
}

function getStore(ctx: Context) {
    return isSupportContextSelected(ctx) ? supportMetricsStore : costMetricsStore as Store
}

function getToolbar(ctx: Context) {
    return isSupportContextSelected(ctx) ? SupportMetricsToolbar : CostMetricsToolbar
}
