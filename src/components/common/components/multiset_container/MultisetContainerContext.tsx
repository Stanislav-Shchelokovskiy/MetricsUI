import React, { createContext, useContext } from 'react'
import FetchResult from '../../Interfaces'
import { BaseContainerState } from '../../store/multiset_container/BaseContainerState'
import { Context as context } from '../../store/multiset_container/Context'
import { BaseSetState } from '../../store/multiset_container/sets/Interfaces'
import { Agg } from './graph/ComparisonGraph'
import { GroupByPeriod } from './graph/GroupByPeriodSelector'
import { Metric } from './graph/MetricSelector'
import { MultisetContainerStore } from '../../store/multiset_container/Store'

interface GraphSettingsPanelContext {
    fetchPeriod: (...args: any) => Promise<FetchResult<Array<string>>>,
    fetchGroupByPeriods: (...args: any) => Promise<FetchResult<Array<GroupByPeriod>>>,
}

interface GraphContext {
    fetchPeriods: (container: BaseContainerState) => Promise<FetchResult<Array<string> | Array<number>>>
    fetchAggs: (container: BaseContainerState, set: BaseSetState) => Promise<FetchResult<Agg>>
    containerDepsSelector: (container: BaseContainerState) => Array<any>
}

interface StateManagementContext {
    shareableStateSelector: (state: any) => any,
    stateSalt: string
    endPoint: string
    navigateTo: string
}

interface RawDataContext {
    fetchRawData: (...args: any) => Promise<FetchResult<Array<any>>>
}

interface FilterLabelContext {
    fetchDisplayFilter(metric: string, set: BaseSetState): Promise<FetchResult<Array<any>>>
}

interface Context {
    graphSettingsPanel: GraphSettingsPanelContext
    graph: GraphContext
    stateManagement: StateManagementContext
    rawData: RawDataContext
    filterLabel: FilterLabelContext
    fetchMetrics: (...args: any) => Promise<FetchResult<Array<Metric>>>,
    changeMetric: (metric: Metric) => void
    changeState: (state: MultisetContainerStore) => void
    context: context
}

export const MultisetContainerContext = createContext<Context>(null!)

export function useMultisetContainerContext() {
    return useContext(MultisetContainerContext)
}
