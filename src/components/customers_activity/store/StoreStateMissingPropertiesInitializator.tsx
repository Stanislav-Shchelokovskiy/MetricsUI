import { Set } from './SetsReducer'
import { CustomersActivityState } from './CustomersActivityReducer'
import { getDefaultFilterParametersNode, getDefaultFilterParameterNode } from './SetsReducer'
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
        if (set.customersTypes === undefined)
            set.customersTypes = getDefaultFilterParametersNode<number>()
        if (set.conversionsTypes === undefined)
            set.conversionsTypes = getDefaultFilterParametersNode<number>()
        if (set.platforms === undefined)
            set.platforms = getDefaultFilterParametersNode<string>()
        if (set.products === undefined)
            set.products = getDefaultFilterParametersNode<string>()
        if (set.positions === undefined)
            set.positions = getDefaultFilterParametersNode<string>()
        if (set.empTribes === undefined)
            set.empTribes = getDefaultFilterParametersNode<string>()
        if (set.employees === undefined)
            set.employees = getDefaultFilterParametersNode<string>()
        if (set.percentile === undefined)
            set.percentile = getDefaultFilterParameterNode<number>(100)
        if (set.customers === undefined)
            set.customers = getDefaultFilterParametersNode<string>()
    }
    return customersActivitySets
}
