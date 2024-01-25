import React, { useReducer, useCallback, useMemo, FC } from 'react'
import { Provider } from 'react-redux'
import {
    isSupportContextSelected,
    isCostContextSelected,
    contextOrDefault,
    Context,
} from '../common/store/multiset_container/Context'
import { MultisetContainerContext, useMultisetContainerContext } from '../common/components/multiset_container/MultisetContainerContext'
import ApplySharedState from '../common/components/state_management/ApplySharedState'
import { fetchMetrics, fetchMetricDesc } from './fetchMetrics'
import { Metric } from '../common/components/multiset_container/graph/metric_selector/Metric'
import MultisetContainer from '../common/components/multiset_container/MultisetContainer'
import { SettingsSets } from '../common/components/multiset_container/MultisetContainer'
import SupportMetricsSet from '../support_metrics/content/set/Set'
import CostMetricsSet from '../cost_metrics/content/set/Set'
import PerformanceMetricsSet from '../performance_metrics/content/set/Set'
import SupportMetricsToolbar from '../support_metrics/toolbar/Toolbar'
import CostMetricsToolbar from '../cost_metrics/toolbar/Toolbar'
import PerformanceMetricsToolbar from '../performance_metrics/toolbar/Toolbar'
import { MultisetContainerStore } from '../common/store/multiset_container/Store'
import LocalStatesConverter from './StatesConverter'
import ErrorNotifier from '../app_components/ErrorNotifier'
import { getContext } from './Utils'
import { multisetStore } from './store/MultisetStore'
import {
    containerReducer,
    newContainerState,
    changeContext as _changeContext,
    changeMetric as _changeMetric,
} from './store/ContainerReducer'


export default function EngineeringMetrics() {
    return <EngineeringMetricsContainer content={EngineeringMetricsContent} />
}


export function EngineeringMetricsApplySharedState({ context }: { context: Context }) {
    multisetStore.changeContext(context)
    return <EngineeringMetricsContainer content={ApplySharedState} />
}

interface ContainerProps {
    metric: string
    context: Context
}
interface Props { content: FC<ContainerProps> }
function EngineeringMetricsContainer(props: Props) {
    return (
        < LocalStatesConverter >
            <ErrorNotifier>
                <EngineeringMetricsContainerInner {...props} />
            </ErrorNotifier>
        </LocalStatesConverter >
    )
}

function EngineeringMetricsContainerInner(props: Props) {
    const [state, dispatch] = useReducer(containerReducer, newContainerState(multisetStore.getContext(), multisetStore.getMetric()))

    const changeMetric = useCallback((metric: Metric) => {
        const ctx = contextOrDefault(metric.context)
        multisetStore.changeContext(ctx)
        multisetStore.validateState()
        dispatch(_changeMetric(metric))
    }, [dispatch])

    const changeState = useCallback((state?: MultisetContainerStore) => {
        if (state === undefined) {
            multisetStore.resetContext()
        } else {
            const ctx = contextOrDefault(state.container?.context)
            multisetStore.changeContext(ctx)
            multisetStore.applyState(state)
        }
        dispatch(_changeContext(multisetStore.getContext()))
    }, [dispatch])

    const context = useMemo(() => {
        const baseContext = getContext(state.context)
        baseContext.stateManagement.getShareableState = multisetStore.getShareableState
        return {
            ...baseContext,
            fetchMetrics: fetchMetrics,
            fetchMetricDescription: fetchMetricDesc,
            changeMetric: changeMetric,
            changeState: changeState,
            context: state.context,
        }
    }, [state.context])

    const store = multisetStore.getStore()
    return <MultisetContainerContext.Provider value={context}>
        <Provider store={store}>
            <props.content {...state} />
        </Provider>
    </MultisetContainerContext.Provider >
}


function EngineeringMetricsContent(props: ContainerProps) {
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
