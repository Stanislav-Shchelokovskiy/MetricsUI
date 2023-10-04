import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { containerValidator as validateContainer, setsValidator as validateSets } from '../../common/store/multiset_container/StoreStateValidator'
import { StringFilterParameters } from '../../common/store/multiset_container/sets/Interfaces'

export function containerValidator(container: ContainerState): ContainerState {
    return validateContainer(container, CONTEXT)
}

export function setsValidator(sets: Array<SetState>): Array<SetState> {
    return validateSets(sets, validateSet)
}

function validateSet(set: SetState): SetState {
    if ('empPositions' in set) {
        set.positions = (set as any).empPositions as StringFilterParameters
        delete (set as any).empPositions
    }
    return set
}
