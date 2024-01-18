import React, { createContext, useContext } from 'react'
import FetchResult from '../../Typing'
import { BaseContainerState } from '../../store/multiset_container/BaseContainerState'
import { Context as context } from '../../store/multiset_container/Context'
import { BaseSetState } from '../../store/multiset_container/sets/Interfaces'
import { Agg } from './graph/ComparisonGraph'
import { GroupBy } from './graph/GroupBySelector'
import { Metric } from './graph/MetricSelector'
import { MultisetContainerStore } from '../../store/multiset_container/Store'
import { FilterField } from './Toolbar/FilterTooltip'
import { HelpItem } from '../../Typing'

interface GraphSettingsPanelContext {
    fetchPeriod: (...args: any) => Promise<FetchResult<Array<string>>>,
    fetchGroupBys: (...args: any) => Promise<FetchResult<Array<GroupBy>>>,
}

interface GraphContext {
    fetchPeriods: (container: BaseContainerState, signal: AbortSignal) => Promise<FetchResult<Array<string> | Array<number>>>
    fetchAggs: (container: BaseContainerState, set: BaseSetState, signal: AbortSignal) => Promise<FetchResult<Agg>>
    containerDepsSelector: (container: BaseContainerState) => Array<any>
}

interface StateManagementContext {
    getShareableState: () => any,
    endPoint: string
    navigateTo: string
}

interface RawDataContext {
    fetchRawData: (...args: any) => Promise<FetchResult<Array<any>>>
}

interface FilterLabelContext {
    fetchDisplayFilter(metric: string, set: BaseSetState): Promise<FetchResult<Array<any>>>
    getFilterFields(): Array<FilterField>
}

interface AdvancedSettingsContext {
    modified: (store: any) => boolean
}

interface Context {
    graphSettingsPanel: GraphSettingsPanelContext
    graph: GraphContext
    stateManagement: StateManagementContext
    rawData: RawDataContext
    filterLabel: FilterLabelContext
    advancedSettings: AdvancedSettingsContext
    fetchMetrics: (...args: any) => Promise<FetchResult<Array<Metric>>>,
    fetchMetricDescription: (metric: string, signal: AbortSignal) => Promise<FetchResult<HelpItem>>,
    changeMetric: (metric: Metric) => void
    changeState: (state?: MultisetContainerStore) => void
    context: context
    orientation: PlotOrientation
    xName: string
    yName: string
}

export type PlotOrientation = 'h' | 'v' | undefined
export function isHorzOrientation(orientation: PlotOrientation): boolean {
    return orientation === 'h'
}

export const MultisetContainerContext = createContext<Context>(null!)

export function useMultisetContainerContext() {
    return useContext(MultisetContainerContext)
}
