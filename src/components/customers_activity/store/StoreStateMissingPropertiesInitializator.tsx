import { SetState } from './SetsReducer'
import { getDefaultFilterParametersNode } from './SetsReducer'

export function initMissingCustomersActivitySetsProperties(customersActivitySets: Array<SetState>): Array<SetState> {
    for (const set of customersActivitySets) {
        if (set.customersTypes === undefined) {
            set.customersTypes = getDefaultFilterParametersNode<number>();
        }
    }
    return customersActivitySets
}
