import { Set } from './sets_reducer/Interfaces'
import { CustomersActivityShareableState } from './Store'
import { DEFAULT_SET } from './sets_reducer/Defaults'
import { CustomersActivityState } from './CustomersActivityReducer'
import { getValidComparisonMethodOrDefault } from '../graph/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../common_settings_panel/MetricSelector'
import { toFriendlyTitle } from '../../common/store/set_container/sets/Utils'

export function containerValidator(state: CustomersActivityShareableState): CustomersActivityState {
    const customersActivity = state.customersActivity
    customersActivity.comparisonMethod = getValidComparisonMethodOrDefault(customersActivity.comparisonMethod)
    customersActivity.metric = getValidMetricOrDefault(customersActivity.metric)
    customersActivity.sets = customersActivity.sets.map(x => toFriendlyTitle(x))
    if (customersActivity.baselineAlignedModeEnabled === undefined)
        customersActivity.baselineAlignedModeEnabled = false
    if (customersActivity.hiddenLegends === undefined)
        customersActivity.hiddenLegends = []
    return customersActivity
}

export function setsValidator(state: CustomersActivityShareableState): Array<Set> {
    const customersActivitySets = state.customersActivitySets
    for (const set of customersActivitySets) {
        set.title = toFriendlyTitle(set.title)

        if (set.percentile === undefined)
            set.percentile = DEFAULT_SET.percentile

        if (set.ticketsTypes === undefined || set.ticketsTypes.values.length === 0)
            set.ticketsTypes = DEFAULT_SET.ticketsTypes

        // This is for backward compatibility in case tag value is plain number, not str number in brackets.
        if (set.ticketsTags !== undefined)
            set.ticketsTags.values = set.ticketsTags.values.map(x => x.toString().includes('(') ? x : `(${x})`)
    }
    return customersActivitySets
}
