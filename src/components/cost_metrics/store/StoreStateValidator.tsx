import { CostMetricsShareableStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { containerValidator as validateContainer, setsValidator as validateSets } from '../../common/store/multiset_container/StoreStateValidator'
import { StringFilterParameters } from '../../common/store/multiset_container/sets/Interfaces'

export function containerValidator(state: CostMetricsShareableStore): ContainerState {
    return validateContainer(state.container, CONTEXT, (container) => container)
}

export function setsValidator(state: CostMetricsShareableStore): Array<SetState> {
    const customValidator = (set: SetState) => {
        if ('empPositions' in set) {
            set.positions = (set as any).empPositions as StringFilterParameters
            delete (set as any).empPositions
        }
        return set
    }
    return validateSets(state.sets, customValidator)
}
