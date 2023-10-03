import { CostMetricsStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { containerValidator as validateContainer, setsValidator as validateSets } from '../../common/store/multiset_container/StoreStateValidator'
import { StringFilterParameters } from '../../common/store/multiset_container/sets/Interfaces'

export function containerValidator(state: CostMetricsStore): ContainerState {
    return validateContainer(state.container, CONTEXT, (container) => container)
}

export function setsValidator(state: CostMetricsStore): Array<SetState> {
    return validateSets(state.sets, validateSet)
}

function validateSet(set: SetState): SetState {
    if ('empPositions' in set) {
        set.positions = (set as any).empPositions as StringFilterParameters
        delete (set as any).empPositions
    }
    return set
}
