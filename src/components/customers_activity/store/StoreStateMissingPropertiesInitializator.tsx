import { Set } from './SetsReducer'
import { CustomersActivityState } from './CustomersActivityReducer'
import { DEFAULT_SET } from './SetsReducer'
import { getValidComparisonMethodOrDefault } from '../common_settings_panel/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../common_settings_panel/MetricSelector'

export function initMissingCustomersActivityProperties(customersActivity: CustomersActivityState): CustomersActivityState {
    customersActivity.comparisonMethod = getValidComparisonMethodOrDefault(customersActivity.comparisonMethod)
    customersActivity.metric = getValidMetricOrDefault(customersActivity.metric)
    if (customersActivity.baselineAlignedModeEnabled === undefined)
        customersActivity.baselineAlignedModeEnabled = false
    return customersActivity
}

export function initMissingCustomersActivitySetsProperties(customersActivitySets: Array<Set>): Array<Set> {
    for (const set of customersActivitySets) {
        if (set.percentile === undefined)
            set.percentile = DEFAULT_SET.percentile

        if (set.ticketsTypes === undefined)
            set.ticketsTypes = DEFAULT_SET.ticketsTypes
    }
    return customersActivitySets
}
