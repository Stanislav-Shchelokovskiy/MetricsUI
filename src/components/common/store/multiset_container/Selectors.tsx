import { createSelector } from '@reduxjs/toolkit'
import { MultisetContainerStore } from "./Store"
import { BaseContainerState } from "./BaseContainerState"
import { BaseSetState } from "./sets/Interfaces"

export function metricSelector<ContainerState extends BaseContainerState>(store: MultisetContainerStore<ContainerState>) {
    return store.container.metric
}

export function setsSelector<T>(store: MultisetContainerStore<BaseContainerState, T>) {
    return store.sets
}

function setTitleSelector(store: any, setTitle: string) {
    return setTitle
}

function setSelector<T extends BaseSetState>(sets: Array<T>, setTitle: string) {
    return sets.find(x => x.title === setTitle)
}

export function getSelector<T extends BaseSetState, R = any>(selector: (set: T | undefined) => R | undefined) {
    return createSelector([setsSelector, setTitleSelector], (sets, setTitle) => selector(setSelector<T>(sets as Array<T>, setTitle)))
}
