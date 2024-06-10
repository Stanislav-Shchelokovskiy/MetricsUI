import { getDefaultTitle } from './sets/Defaults'
import { BooleanSetting } from '../../Typing'
import { groupByOrDefault } from '../../components/multiset_container/graph/GroupBySelector'
import { comparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { metricOrDefault } from '../../components/multiset_container/graph/metric_selector/MetricSelector'
import { periodOrDefault } from '../../DatePeriodUtils'
import { Context } from './Context'
import { booleanSetting, Undefinable } from '../../Typing'


export interface BaseContainerState {
    context: Context
    range: Array<string>
    groupBy: string
    metric: string
    comparisonMethod: string
    sets: Array<string>
    hiddenLegends: Array<string>
    version: Undefinable<string>
    disablePeriodExtension: BooleanSetting
}

export function getDefaultBaseContainerState(context: Context): BaseContainerState {
    return {
        context: context,
        range: periodOrDefault(undefined),
        groupBy: groupByOrDefault(undefined, context),
        metric: metricOrDefault(undefined),
        comparisonMethod: comparisonMethodOrDefault(undefined),
        sets: [getDefaultTitle()],
        hiddenLegends: Array<string>(),
        version: undefined,
        disablePeriodExtension: undefined,
    }
}

export function advancedSettingsModified(container: BaseContainerState): boolean {
    return booleanSetting(container.disablePeriodExtension)
}
