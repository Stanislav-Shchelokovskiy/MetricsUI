import { SetState } from './SetsReducer'
import { CustomersActivityState } from './CustomersActivityReducer'
import { getDefaultFilterParametersNode } from './SetsReducer'
import { getValidComparisonMethodOrDefault } from '../common_settings_panel/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../common_settings_panel/MetricSelector'

export function initMissingCustomersActivityProperties(customersActivity: CustomersActivityState): CustomersActivityState {
    customersActivity.comparisonMethod = getValidComparisonMethodOrDefault(customersActivity.comparisonMethod)
    customersActivity.metric = getValidMetricOrDefault(customersActivity.metric)
    if (customersActivity.trackedCustomersGroupsModeEnabled === undefined)
        customersActivity.trackedCustomersGroupsModeEnabled = false
    return customersActivity
}

export function initMissingCustomersActivitySetsProperties(customersActivitySets: Array<SetState>): Array<SetState> {
    for (const set of customersActivitySets) {
        if (set.customersTypes === undefined)
            set.customersTypes = getDefaultFilterParametersNode<number>();
        if (set.conversionsTypes === undefined)
            set.conversionsTypes = getDefaultFilterParametersNode<number>();
        if (set.platforms === undefined)
            set.platforms = getDefaultFilterParametersNode<string>();
        if (set.products === undefined)
            set.products = getDefaultFilterParametersNode<string>();
        if (set.positions === undefined)
            set.positions = getDefaultFilterParametersNode<string>();
        if (set.empTribes === undefined)
            set.empTribes = getDefaultFilterParametersNode<string>();
        if (set.employees === undefined)
            set.employees = getDefaultFilterParametersNode<string>();
        if (set.selectTop === undefined)
            set.selectTop = 100
    }
    return customersActivitySets
}
