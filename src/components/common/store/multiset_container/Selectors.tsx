import { createSelector } from '@reduxjs/toolkit'
import { MultisetContainerStore } from "./Store"
import { BaseContainerState } from "./BaseContainerState"
import { BaseSetState } from "./sets/Interfaces"
import { booleanSetting } from '../../Typing'

export function metricSelector<ContainerState extends BaseContainerState>(store: MultisetContainerStore<ContainerState>) {
    return store.container.metric
}

export function isTicketLifetimeSelector<ContainerState extends BaseContainerState>(store: MultisetContainerStore<ContainerState>) {
    return isTicketLifetimeSelected(metricSelector(store))
}

export function isTicketLifetimeSelected(metric: string): boolean {
    return metric == 'Ticket Lifetime'
}

export function rangeSelector<ContainerState extends BaseContainerState>(store: MultisetContainerStore<ContainerState>) {
    return store.container.range
}

export function disablePeriodExtensionSelector<ContainerState extends BaseContainerState>(store: MultisetContainerStore<ContainerState>): boolean {
    return booleanSetting(store.container.disablePeriodExtension)
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

