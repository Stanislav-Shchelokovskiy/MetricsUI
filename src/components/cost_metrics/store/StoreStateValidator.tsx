import { CostMetricsShareableState } from './Store'
import { Container } from './ContainerReducer'
import { Set } from './SetsReducer'


export function containerValidator(state: CostMetricsShareableState): Container {
    return state.container
}

export function setsValidator(state: CostMetricsShareableState): Array<Set> {
    return state.sets
}
