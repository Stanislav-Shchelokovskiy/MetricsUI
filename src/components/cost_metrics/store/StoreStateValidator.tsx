import { CostMetricsStore, CostMetricsShareableStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { defaultContainerValidator, defaultSetsValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { FilterParametersNode } from '../../common/store/multiset_container/sets/Interfaces'

export function stateValidator(state: CostMetricsStore): CostMetricsStore {
    return {
        container: containerValidator(state),
        sets: setsValidator(state),
    }
}

export function containerValidator(state: CostMetricsShareableStore): ContainerState {
    return defaultContainerValidator(state.container, CONTEXT)
}

export function setsValidator(state: CostMetricsShareableStore): Array<SetState> {
    const sets = defaultSetsValidator(state.sets)
    for (const set of sets) {
        if ('empPositions' in set) {
            console.log('empPositions', (set as any).empPositions)
            set.positions = (set as any).empPositions as FilterParametersNode<string>
            delete (set as any).empPositions
        }
    }
    return sets
}
