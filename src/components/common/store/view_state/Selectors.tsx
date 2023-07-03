import { ViewState } from './Reducers'

export function stateNamesSelector(store: ViewState) {
    return store.stateKeys
}

export function stateNameSelector(store: ViewState) {
    return store.key
} 

export function saltSelector(store: ViewState) {
    return store.salt
}
