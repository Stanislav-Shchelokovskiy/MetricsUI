import { CostMetricsStore, CostMetricsShareableStore } from './Store'
import { ContainerState } from './ContainerReducer'
import { SetState } from './SetsReducer'

export function stateValidator(state: CostMetricsStore) {
    return state
}

export function containerValidator(state: CostMetricsShareableStore): ContainerState {
    return state.container
}

export function setsValidator(state: CostMetricsShareableStore): Array<SetState> {
    return state.sets
}
