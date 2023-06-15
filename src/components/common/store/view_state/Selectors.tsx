import { ViewStateStore } from './Reducers'

export function stateNamesSelector(store: ViewStateStore) {
    return store.viewState.stateKeys
}
export function stateNameSelector(store: ViewStateStore) {
    return store.viewState.key
} 
