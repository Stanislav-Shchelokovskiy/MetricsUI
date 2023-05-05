import { Set } from './sets_reducer/Interfaces'
import { DEFAULT_SET } from './sets_reducer/Defaults'
import { CustomersActivityState } from './CustomersActivityReducer'
import { getValidComparisonMethodOrDefault } from '../common_settings_panel/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../common_settings_panel/MetricSelector'

export function validateCustomersActivityProperties(customersActivity: CustomersActivityState): CustomersActivityState {
    customersActivity.comparisonMethod = getValidComparisonMethodOrDefault(customersActivity.comparisonMethod)
    customersActivity.metric = getValidMetricOrDefault(customersActivity.metric)
    if (customersActivity.baselineAlignedModeEnabled === undefined)
        customersActivity.baselineAlignedModeEnabled = false
    if (customersActivity.hiddenLegends === undefined)
        customersActivity.hiddenLegends = []
    return customersActivity
}

export function validateCustomersActivitySetsProperties(customersActivitySets: Array<Set>): Array<Set> {
    for (const set of customersActivitySets) {
        if (set.percentile === undefined)
            set.percentile = DEFAULT_SET.percentile

        if (set.ticketsTypes === undefined || set.ticketsTypes.values.length === 0)
            set.ticketsTypes = DEFAULT_SET.ticketsTypes

        if (set.ticketsTags !== undefined) {
            set.ticketsTags.values = set.ticketsTags.values.map(x => Number.isNaN(x) ? x : `(${x})`)
        }
    }
    return customersActivitySets
}
