import { EngineeringMetricsStore } from "./Store"

export function contextSelector(store: EngineeringMetricsStore) {
    return store.context
}
