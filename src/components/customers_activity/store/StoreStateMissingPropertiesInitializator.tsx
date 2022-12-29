import { SetState } from './SetsReducer'
import { getDefaultFilterParametersNode } from './SetsReducer'

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
    }
    return customersActivitySets
}
