import { configureViewStore } from "../view_state/Store"

const stateKey = 'multiset_container_view'
const stateSalt = 'CustomersActivity_'

export const viewStore = configureViewStore(
    stateKey,
    stateSalt
)

export type ViewStore = ReturnType<typeof viewStore.getState>
