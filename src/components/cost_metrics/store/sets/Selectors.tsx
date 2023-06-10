import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { CostMetricsStore } from '../Store'
import { SetState } from './SetsReducer'

const setsSelector = (store: CostMetricsStore) => store.sets
const findSet = (sets: Array<SetState>, setTitle: string) => sets.find(x => x.title === setTitle)

export function empTeamsSelector(setTitle: string) {
    return createSelector(setsSelector, sets => findSet(sets, setTitle)?.empTeams)
}

export function empTribesSelector(setTitle: string) {
    return createSelector(setsSelector, sets => findSet(sets, setTitle)?.empTribes)
}

export function empPositionsSelector(setTitle: string) {
    return createSelector(setsSelector, sets => findSet(sets, setTitle)?.empPositions)
}
