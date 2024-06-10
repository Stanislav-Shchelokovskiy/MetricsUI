import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { containerValidator as validateContainer, setsValidator as validateSets } from '../../common/store/multiset_container/StoreStateValidator'

export function containerValidator(container: ContainerState): ContainerState {
    return validateContainer(container, CONTEXT)
}

export function setsValidator(sets: Array<SetState>): Array<SetState> {
    return validateSets(sets)
}
