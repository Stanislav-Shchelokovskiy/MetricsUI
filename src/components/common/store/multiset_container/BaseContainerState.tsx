import { getDefaultTitle } from './sets/Defaults'
import { BooleanSetting } from '../../Typing'
import { groupByOrDefault } from '../../components/multiset_container/graph/GroupBySelector'
import { validComparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { validMetricOrDefault } from '../../components/multiset_container/graph/MetricSelector'
import { rangeOrDefault } from '../../components/RangePeriodSelector'
import { Context } from './Context'
import { booleanSetting } from '../../Typing'


export interface BaseContainerState {
    context: Context
    range: Array<string>
    groupBy: string
    metric: string
    comparisonMethod: string
    sets: Array<string>
    hiddenLegends: Array<string>
    version: string | undefined
    disablePeriodExtension: BooleanSetting
}

export function getDefaultBaseContainerState(context: Context): BaseContainerState {
    return {
        context: context,
        range: rangeOrDefault(undefined),
        groupBy: groupByOrDefault(undefined, context),
        metric: validMetricOrDefault(undefined),
        comparisonMethod: validComparisonMethodOrDefault(undefined),
        sets: [getDefaultTitle()],
        hiddenLegends: Array<string>(),
        version: undefined,
        disablePeriodExtension: undefined,
    }
}

export function advancedSettingsModified(container: BaseContainerState): boolean {
    return booleanSetting(container.disablePeriodExtension)
}
