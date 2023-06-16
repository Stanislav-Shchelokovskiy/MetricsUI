import React, { useCallback, useMemo, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Provider, useStore } from 'react-redux'
import { changeContext } from './store/Actions'
import { Context } from './store/ContainerReducer'
import { contextSelector } from './store/Selectors'
import { MultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
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
import { useMultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import SupportMetricsSet from '../support_metrics/content/set/Set'
import CostMetricsSet from '../cost_metrics/content/set/Set'
import SupportMetricsToolbar from '../support_metrics/toolbar/Toolbar'
import CostMetricsToolbar from '../cost_metrics/toolbar/Toolbar'
import { ContainerState } from './store/ContainerReducer'
import { engineeringMetricsStore } from './store/Store'

export default function EngineeringMetrics() {
    return <Provider store={engineeringMetricsStore}>
        <EngineeringMetricsContainer content={EngineeringMetricsContent} />
    </Provider>
}

export function EngineeringMetricsApplySharedState() {
    return <Provider store={engineeringMetricsStore}>
        <EngineeringMetricsContainer content={ApplySharedState} />
    </Provider>
}


interface Props {
    content: FC<ContainerState>
}

function getContext(ctx: Context) {
    if (ctx === Context.Support)
        return supportMetricsContext
    return costMetricsContext
}

function EngineeringMetricsContainer(props: Props) {
    const ctx = useSelector(contextSelector)
    const dispatch = useDispatch()
    const changeMetric = useCallback((metric: Metric) => {
        dispatch(changeContext(metric))
    }, [])

    const context = useMemo(() => {
        return {
            ...getContext(ctx),
            changeMetric: changeMetric,
            fetchMetrics: fetchMetrics,
            context: ctx
        }
    }, [ctx])

    const store = useStore<EngineeringMetricsStore>()
    const state = store.getState()
    return <MultisetContainerContext.Provider value={context}>
        <Provider store={getStore(ctx)}>
            <props.content metric={state.metric} />
        </Provider>
    </MultisetContainerContext.Provider >
}

function EngineeringMetricsContent(props: ContainerState) {
    console.log(window.location.href.replace(window.location.pathname, '/qwe'))
    return <MultisetContainer
        metric={props.metric.name}
        sets={Sets}
        toolbar={getToolbar(props.metric.context)}
    />
}

function Sets() {
    const { context } = useMultisetContainerContext()
    return <SettingsSets set={context === Context.Support ? SupportMetricsSet : CostMetricsSet} />
}

function getStore(ctx: Context) {
    return ctx === Context.Support ? supportMetricsStore : costMetricsStore as any
}

function getToolbar(ctx: Context) {
    return ctx === Context.Support ? SupportMetricsToolbar : CostMetricsToolbar
}
